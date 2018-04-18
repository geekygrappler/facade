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
   * The user who will be purchasing the property.
   */
  buyer: DS.belongsTo('user'),

  /**
   * The solicitor who will handle the case.
   */
  solicitor: DS.belongsTo('user'),

  /**
   * This is vaguely the address of the property being bought.
   * Not sure at this stage if we'll need the current address of the buyer as well as
   * ther property address
   */
  address: DS.belongsTo('address'),

  /**
   * Number of complete tasks
   */
  numberOfCompleteTasks: length(filterBy('tasks', raw('complete'), true))
});
