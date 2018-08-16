import DS from 'ember-data';
import { filterBy, length } from 'ember-awesome-macros/array';
import raw from 'ember-macro-helpers/raw';

/**
 * Represents a conveyancing case
 */

export default DS.Model.extend({
  /**
   * Represents anything needing to be done for the conveyancing
   * Searches, Document upload, Agreemeents signed. Many of these will need to be developed
   * in conjugtion with a solicitor.
   */
  tasks: DS.hasMany('task'),

  /**
   * The customer
   */
  customer: DS.belongsTo('customer'),

  /**
   * The solicitor who will handle the case.
   */
  solicitor: DS.belongsTo('user'),

  /**
   * The address of the property being bought, indicates that we need tasks for a purchase
   */
  purchaseAddress: DS.belongsTo('address'),

  /**
   * The address of the property being sold, indicates that we need tasks for a sale
   */
  saleAddress: DS.belongsTo('address'),

  /**
   * Number of complete tasks
   */
  numberOfCompleteTasks: length(filterBy('tasks', raw('complete'), true))
});
