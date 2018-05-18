import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('task-action', {
  polymorphic: false,
  default: {
    description: 'A description of the document to be uploaded'
  },
});
