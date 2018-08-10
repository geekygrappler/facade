import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  signup: service(),
  actions: {
    transitionToDeposit() {
      this.signup.set('firstName', this.firstName);
      this.signup.set('middleNames', this.middleNames);
      this.signup.set('lastName', this.lastName);
      this.transitionToRoute('signup.deposit');
    }
  }
});