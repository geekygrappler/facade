import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupFactoryGuy, mock, mockQuery, buildList, build, mockFindRecord, make } from 'ember-data-factory-guy';
import { JWT } from '../helpers/users';

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
    module('a solicitor', function() {
      test('after successful login the solictor is redirected to their dashboard', async function(assert) {
        mock({
          type: 'POST',
          url: '/token',
          responseText: { access_token: JWT }
        });

        let user = build('solicitor');
        mockFindRecord('user').returns({ json: user });

        mockQuery('conveyance').returns({ json: buildList('conveyance', 3) });

        await visit('/login');

        await click('[data-test-login-button]');

        assert.equal(currentURL(), '/dashboard', 'A solicitor is redirected to dashboard after login');
      });

      test('should be redirected to their dashboard if they try to access \'/login\'', async function(assert) {
        let session = this.owner.lookup('service:session');
        session.set('isAuthenticated', true);
        session.set('data', {
          authenticated: { access_token: JWT }
        });

        let user = build('solicitor');
        mockFindRecord('user').returns({ json: user });

        mockQuery('conveyance').returns({ json: buildList('conveyance', 3) });

        await visit('/login');

        assert.equal(currentURL(), '/dashboard', 'A solicitor is redirected to dashboard when already logged in');
      });

      test('when the application loads the user will be available if the session is authenticated', async function(assert) {
        let session = this.owner.lookup('service:session');
        session.set('isAuthenticated', true);
        session.set('data', {
          authenticated: { access_token: JWT }
        });

        let user = build('solicitor');
        mockFindRecord('user').returns({ json: user });

        await visit('/');

        let store = this.owner.lookup('service:store');

        assert.equal(store.peekRecord('user', user.get('id')).get('id'), user.get('id'), 'The user is loaded when the session is authenticated');
      });
    });

    module('a buyer', function() {
      test('will be redirected to their conveyance case', async function(assert) {
        mock({
          type: 'POST',
          url: '/token',
          responseText: { access_token: JWT }
        });

        let user = build('buyer');
        mockFindRecord('user').returns({ json: user });

        let conveyance = make('conveyance');

        mockQuery('conveyance').returns({ models: [conveyance] });

        await visit('/login');

        await click('[data-test-login-button]');

        assert.equal(currentURL(), `/conveyances/${conveyance.id}`, 'The user is redirected to dashboard after login');
      });
    });
  });
});
