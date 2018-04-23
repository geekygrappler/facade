import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
  routeAfterAuthentication: 'dashboard',
  currentUser: service(),

  beforeModel() {
    return this.get('currentUser.user');
  }
});