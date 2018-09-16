import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),

  fileQueueName: computed(function() {
    return `action-${this.action.id}-upload`;
  }),

  multipleDocumentUpload: task(function * (queue) {
    yield queue.files.reduce(file => this.uploadDocument(file));
  }),

  uploadDocument: task(function * (file) {
    let { action } = this;
    let document = this.store.createRecord('document', {
      name: file.name
    });
    action.documents.pushObject(document);
    action.set('approved', false);

    try {
      let dataUrl = yield file.readAsDataURL();
      if (document.url == null) {
        document.set('url', dataUrl);
      }

      let response = yield file.upload('/s3/some/bucket');
      document.set('url', response.headers.Location);
      yield document.save();
    } catch (e) {
      document.rollback();
    }
    try {
      yield action.save();
    } catch (e) {
      action.rollback();
    }
  }).maxConcurrency(3).enqueue(),
});
