import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  store: service(),
  signup: task(function * (userData, addressData, event) {
    event.preventDefault();
    let buyer;
    try {
      buyer = yield this.get('store').createRecord('user', Object.assign(userData, { role: 'buyer' })).save();
    } catch(e) {
      Error(e);
    }

    let address = this.get('store').createRecord('address', addressData);

    let conveyance = this.get('store').createRecord('conveyance', {
      address,
      buyer
    });

    try {
      yield conveyance.save();
    } catch(e) {
      throw Error(e);
    }

    this.transitionToRoute('login');
  }).drop()
});
