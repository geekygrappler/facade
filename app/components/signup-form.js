import Component from '@ember/component';

export default Component.extend({
  onSignup() {},
  init() {
    this._super();
    this.userData = {};
    this.addressData = {};
  },
  actions: {
    setPrefix: function(prefix) {
      this.set('userData.prefix', prefix);
    }
  }
});
