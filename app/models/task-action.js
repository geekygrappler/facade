import DS from 'ember-data';
import { equal } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';
import { computed } from '@ember/object';

export default DS.Model.extend({
  /**
   * The available types as the moment 'document-upload', 'form', 'approval'
   */
  type: DS.attr('string'),

  /**
   * User friendly description of the task
   * e.g. Identity document (document-uload)
   * e.g. National Insurance number (form)
   */
  description: DS.attr('string'),

  /**
   * Task-actions have an order if a task has more than one of them.
   */
  order: DS.attr('number'),

  complete: DS.attr('boolean', { defaultValue: false }),

  /**
   * Documents for a 'document-upload' task
   */
  documents: DS.hasMany('document'),

  /**
   * In general uploaded documents by clients need approval. It's not easy to determine
   * if the upload document task-action belongs to a client as it lives in a tasks `clientActions`
   * array.
   *
   * We need to manually set whether it requires approval when the task is created.
   */
  requiresApproval: DS.attr('boolean', { defaultValue: false }),

  /**
   * This needs to manually reset every time a document is added to the array.
   */
  approved: DS.attr('boolean', { defaultValue: false }),

  awaitingApproval: computed('documents.[]', 'requiresApproval', 'approved', function() {
    let { documents, requiresApproval, approved } = this;

    return requiresApproval && documents.length > 0 && !approved;
  }),

  isDocumentUpload: equal('type', raw('document-upload')),
  isDataEntry: equal('type', raw('data-entry')),
  isApproval: equal('type', raw('approval'))
});
