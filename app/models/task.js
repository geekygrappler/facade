import DS from 'ember-data';

/**
 * A task that is part of a conveyancing case
 * e.g. Passport upload, Church searches
 */

export default DS.Model.extend({
  /**
   * e.g. Passport Upload
   */
  title: DS.attr('string'),

  complete: DS.attr('boolean', { defaultValue: false }),

  /**
   * Helpful information for the buyer to understand this task
   */
  description: DS.attr('string'),

  /**
   * Text input for notes
   */
  notes: DS.attr('string'),

  /**
   * Actions for a buyer
   */
  buyerActions: DS.hasMany('task-action'),

  /**
   * Actions for a solicitor
   */
  solicitorActions: DS.hasMany('task-action')
});
