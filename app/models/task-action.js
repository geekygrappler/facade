import DS from 'ember-data';
import { equal } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';

export default DS.Model.extend({
  /**
   * The available types as the moment 'document-upload', 'form', 'approval'
   */
  type: DS.attr('string'),

  /**
   * User friendly description of the task
   * e.g. Identity document (document-upload)
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

  isDocumentUpload: equal('type', raw('document-upload')),
  isDataEntry: equal('type', raw('data-entry'))
});
