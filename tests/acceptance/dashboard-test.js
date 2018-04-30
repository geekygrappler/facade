import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupFactoryGuy, mock, build, mockFindRecord, mockQuery, buildList } from 'ember-data-factory-guy';
import { JWT } from '../helpers/users';


module('Acceptance | dashboard', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  module('as a solicitor', function(hooks) {
    hooks.beforeEach(function() {
      let session = this.owner.lookup('service:session');
      session.set('isAuthenticated', true);
      session.set('data', {
        authenticated: { access_token: JWT }
      });

      mock({
        type: 'POST',
        url: '/token',
        responseText: { access_token: JWT }
      });

      let user = build('solicitor');
      mockFindRecord('user').returns({ json: user });

      mockQuery('conveyance').returns({ json: buildList('conveyance', 3) });
    });

    test('visiting /dashboard', async function(assert) {
      await visit('/dashboard');

      assert.equal(currentURL(), '/dashboard');

      assert.dom('[data-test-solicitor-dashboard]').exists();
    });
  });
});
