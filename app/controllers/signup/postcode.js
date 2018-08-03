import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { gt, not } from '@ember/object/computed';

export default Controller.extend({
  signup: service(),
  validPostcode: gt('postcode.length', 4),
  invalidPostcode: not('validPostcode'),
  actions: {
    submit() {
      this.set('signup.postcode');
      this.transitionToRoute('signup.quote');
    }
  }
});
