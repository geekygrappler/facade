import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('conveyance', params.id);
  },

  setupController(controller, model) {
    controller.set('conveyance', model);
  }
});