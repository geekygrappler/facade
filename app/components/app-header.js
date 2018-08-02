import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  classNames: ['flex', 'bg-purple', 'px-8'],

  session: inject(),

  actions: {
    logout() {
      this.session.invalidate();
    }
  }
});
