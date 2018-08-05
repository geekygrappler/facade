import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { gt, not, and, or } from '@ember/object/computed';

export default Controller.extend({
  signup: service(),
  validPostcode: gt('postcode.length', 4),
  invalidPostcode: not('validPostcode'),
  validBuyingPostcode: gt('buyingPostcode.length', 4),
  validSellingPostcode: gt('sellingPostcode.length', 4),
  validChainPostcodes: and('validBuyingPostcode', 'validSellingPostcode'),
  invalidChainPostcodes: not('validChainPostcodes'),
  canProceed: or('validChainPostcodes', 'validPostcode'),
  cannotProceed: not('canProceed'),
  actions: {
    submit() {
      if (this.canProceed) {
        this.set('signup.postcode');
        this.set('signup.buyingPostcode');
        this.set('signup.sellingPostcode');
        this.transitionToRoute('signup.quote');
      }
    }
  }
});
