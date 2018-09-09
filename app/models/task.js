import DS from 'ember-data';
import { computed } from '@ember/object';
import { filterBy, reads } from '@ember/object/computed';
import { filter } from 'ember-awesome-macros/array';

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
   * If the task is related to a purchase
   */
  purchase: DS.attr('boolean'),

  /**
   * If the task is related to a sale
   */
  sale: DS.attr('boolean'),

  /**
   * If the task is related to the client more generally e.g. address history
   */
  general: DS.attr('boolean'),

  /**
   * Helpful information for the client to understand this task
   */
  description: DS.attr('string'),

  /**
   * Text input for notes
   */
  notes: DS.attr('string'),

  /**
   * Actions
   */
  actions: DS.hasMany('task-action'),

  /**
   * Actions for a client
   */
  clientActions: filter('actions', action => action.owner.get('isClient')),

  /**
   * Actions for a solicitor
   */
  solicitorActions: filter('actions', action => action.owner.get('isSolicitor')),

  orderedActions: computed('actions', function() {
    return this.get('actions').sortBy('order');
  }),

  incompleteActions: filterBy('orderedActions', 'complete', false),

  /**
   * Current Action
   */
  currentAction: computed('orderedActions', function() {
    let actions = this.get('incompleteActions');
    return actions[0];
  }),

  awaitingApproval: computed('clientActions.@each.awaitingApproval', function() {
    return this.get('clientActions').filter(a => a.get('awaitingApproval')).length > 0;
  }),

  currentActionBelongsToClient: reads('currentAction.owner.isClient'),

  currentActionBelongsToHomeward: reads('currentAction.owner.isSolicitor')
});
