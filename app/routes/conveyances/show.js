import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('conveyance', params.id, {
      include: 'purchase-address,sale-address,tasks,tasks.actions,tasks.actions.owner',
      reload: true
    });
  },

  setupController(controller, model) {
    controller.set('conveyance', model);
  }
});
