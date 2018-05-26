import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),

  isBuyer: reads('currentUser.user.isBuyer'),
  isSolicitor: reads('currentUser.user.isSolicitor'),
});
