import DS from 'ember-data';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
  session: service(),
  headers: computed('session.isAuthenticated', function() {
    let token = this.get('session').get('data').authenticated.access_token;
    return {
      'AUTHORIZATION': token
    };
  })
});
