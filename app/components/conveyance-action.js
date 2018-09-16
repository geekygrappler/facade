import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { or, and, eq } from 'ember-awesome-macros';

export default Component.extend({
  store: service(),
  'data-test-conveyance-action-component': true,

  uploadMoreDocuments: false,
  isOwner: false,

  showDocumentUploader: or('uploadMoreDocuments', and(eq('action.documents.length', 0), 'isOwner')),

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

  actions: {
    toggleUploadMoreDocuments() {
      this.toggleProperty('uploadMoreDocuments');
    }
  }
});
