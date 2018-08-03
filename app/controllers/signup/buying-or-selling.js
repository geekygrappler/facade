import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  signup: service(),
  actions: {
    selectType(type) {
      this.set('signup.type', type);
      this.transitionToRoute('signup.postcode');
    }
  }
});