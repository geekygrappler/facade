import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {
  default: {},
  solicitor: {
    role: 'solicitor'
  },
  buyer: {
    role: 'buyer'
  }
});
