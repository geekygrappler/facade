import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
  signup: service(),
  store: service(),
  signupTask: task(function * (event) {
    event.preventDefault();
    let { firstName, middleNames, lastName, email, buyingPostcode, sellingPostcode } = this.signup;
    let customer;
    try {
      customer = yield this.get('store').createRecord('customer',
        {
          firstName,
          middleNames,
          lastName,
          email
        }
      ).save();
    } catch(e) {
      Error(e);
    }

    let purchaseAddress;
    let saleAddress;
    if (buyingPostcode) {
      purchaseAddress = this.get('store').createRecord('address', { postcode: buyingPostcode });
    }
    if (sellingPostcode) {
      saleAddress = this.get('store').createRecord('address', { postcode: sellingPostcode });
    }

    let conveyance = this.get('store').createRecord('conveyance', {
      purchaseAddress,
      saleAddress,
      customer
    });

    try {
      yield conveyance.save();
    } catch(e) {
      throw Error(e);
    }

    this.transitionToRoute('login');
  }).drop()
});