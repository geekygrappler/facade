import Service from '@ember/service';
import { inject as service } from '@ember/service';
import jwtDecode from 'ember-cli-jwt-decode';
import { computed } from '@ember/object';

export default Service.extend({
  session: service(),
  store: service(),

  id: computed('session.data', function() {
    let token = this.get('session').get('data').authenticated.access_token;
    if (token) {
      return jwtDecode(token).userId;
    }
    return null;
  }),

  user: computed('session.isAuthenticated', function() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store').findRecord('user', this.get('id'));
    }
    return null;
  })
});
