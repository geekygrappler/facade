import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {
  default: {
    prefix: 'Mr.',
    firstName: 'Tony',
    lastName: 'Stark',
    role: 'client'
  }
});
