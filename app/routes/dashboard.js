import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    return this.get('store').query('conveyance', {
      filter: { userId: this.get('currentUser.id') } ,
      include: 'address,tasks,solicitor,buyer,tasks.buyer-actions'
    });
  },

  /**
   * After we've collected the user's conveyances, if we have a buyer
   * we will transition to the (TODO active/current/first) case.
   * @param [Conveyances] model
   */
  afterModel(model) {
    return this.currentUser.user.then((user) => {
      let latestConveyance = model.get('firstObject');
      if (user.role === 'buyer') {
        this.transitionTo('conveyances.show', latestConveyance);
      }
    });
  },

  setupController(controller, model) {
    controller.set('conveyances', model);
  }
});