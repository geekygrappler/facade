import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  signup: task(function * (userData, addressData, event) {
    event.preventDefault();
    let { user, address, conveyance } = this;
    user.setProperties(userData);
    try {
      yield user.save();
    } catch(e) {
      Error(e);
    }

    try {
      yield this.get('session').authenticate('authenticator:oauth2', user.email, user.password);
    } catch(e) {
      Error(e);
    }

    address.setProperties(addressData);

    conveyance.set('address', address);
    conveyance.set('buyer', user);
    try {
      yield conveyance.save();
    } catch(e) {
      Error(e);
    }

    this.transitionToRoute('conveyances.show', conveyance);
  }).drop()
});
