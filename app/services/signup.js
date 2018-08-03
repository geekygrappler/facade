import Service from '@ember/service';
import { equal } from '@ember/object/computed';

export default Service.extend({
  isBuying: equal('type', 'buy'),
  isSelling: equal('type', 'sell'),
  isChain: equal('type', 'buyAndSell')
});
