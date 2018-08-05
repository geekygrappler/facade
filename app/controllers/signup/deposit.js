import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  signup: service(),
  actions: {
    createCase() {

      // TODO client rather than buyer as we can have buyer or seller obvs.
    }
  }
});