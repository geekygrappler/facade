import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupFactoryGuy, mock, mockQuery, buildList } from 'ember-data-factory-guy';

module('Acceptance | log in', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  module('unauthenticated users', function() {
    test('visiting the dashboard redirects you to login page', async function(assert) {
      await visit('/dashboard');

      assert.equal(currentURL(), '/login', 'You are redirected to login');
    });

    test('visiting a conveyance will redirect to login page', async function(assert) {
      await visit('/conveyances/123');

      assert.equal(currentURL(), '/login', 'You are redirected to login');
    });
  });

  module('authenticated users', function() {
    test('after successful login the user is redirected to the dashboard', async function(assert) {
      mock({
        type: 'POST',
        url: '/token',
        responseText: { access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIn0.3IVGWbNupXA5kLyvBHoq7EBzkaKdQRsflg5oc_OXGxQ' }
      });

      mockQuery('conveyance').returns({ json: buildList('conveyance', 3) });

      await visit('/login');

      await click('[data-test-login-button]');

      assert.equal(currentURL(), '/dashboard', 'The user is redirected to dashboard after login');
    });

    test('authenticated users should be redirected to their dashboard if they try to access \'/login\'', async function(assert) {
      this.owner.lookup('service:session').set('isAuthenticated', true);

      mockQuery('conveyance').returns({ json: buildList('conveyance', 3) });

      await visit('/login');

      assert.equal(currentURL(), '/dashboard', 'The user is redirected to dashboard when already logged in');
    });
  });
});
