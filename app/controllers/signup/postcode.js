import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { gt, not, and, reads } from '@ember/object/computed';
import { or } from 'ember-awesome-macros';

export default Controller.extend({
  signup: service(),
  isBuying: reads('signup.isBuying'),
  isSelling: reads('signup.isSelling'),
  validBuyingPostcode: gt('buyingPostcode.length', 4),
  validSellingPostcode: gt('sellingPostcode.length', 4),
  validChainPostcodes: and('validBuyingPostcode', 'validSellingPostcode'),
  invalidChainPostcodes: not('validChainPostcodes'),
  canProceed: or('validChainPostcodes', and('validBuyingPostcode', 'isBuying'), and('validSellingPostcode', 'isSelling')),
  cannotProceed: not('canProceed'),
  actions: {
    submit() {
      if (this.canProceed) {
        this.set('signup.buyingPostcode', this.buyingPoscode);
        this.set('signup.sellingPostcode', this.sellingPostcode);
        this.transitionToRoute('signup.quote');
      }
    }
  }
});
