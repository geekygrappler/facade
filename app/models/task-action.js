import DS from 'ember-data';

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
});
