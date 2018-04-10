import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('conveyance', {
  default: {},
  traits: {
    withAddress: {
      address: FactoryGuy.belongsTo('address')
    },
    withTasks: {
      tasks: FactoryGuy.hasMany('task', 3)
    }
  }
});
