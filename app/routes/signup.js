import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'dashboard',
  model() {
    let user = this.get('store').createRecord('user', { role: 'buyer' });
    let address = this.get('store').createRecord('address');
    let conveyance = this.get('store').createRecord('conveyance');
    return { user, address, conveyance };
  },

  setupController(controller, model) {
    controller.set('user', model.user);
    controller.set('address', model.address);
    controller.set('conveyance', model.conveyance);
    controller.set('userData', {});
    controller.set('addressData', {});
  }
});
