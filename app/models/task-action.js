import DS from 'ember-data';
import { equal } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';

export default DS.Model.extend({
  /**
   * The available types as the moment 'document-upload', 'data-entry'
   */
  type: DS.attr('string'),

  /**
   * User friendly description of the task
   * e.g. Identity document (document-upload)
   * e.g. National Insurance number (data-entry)
   */
  description: DS.attr('string'),

  /**
   * Documents for a 'document-upload' task
   */
  documents: DS.hasMany('document'),

  isDocumentUpload: equal('type', raw('document-upload')),
  isDataEntry: equal('type', raw('data-entry'))
});
