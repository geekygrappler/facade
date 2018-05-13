import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {
  default: {
    prefix: 'Mr.',
    firstName: 'Tony',
    lastName: 'Stark'
  },
  solicitor: {
    role: 'solicitor'
  },
  buyer: {
    role: 'buyer'
  }
});
