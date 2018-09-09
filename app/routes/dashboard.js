import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    return this.get('store').query('conveyance', {
      filter: { userId: this.get('currentUser.id') } ,
      include: 'purchase-address,sale-address,tasks,tasks.actions,tasks.actions.owner'
    });
  },

  setupController(controller, model) {
    controller.set('conveyances', model);
  }
});