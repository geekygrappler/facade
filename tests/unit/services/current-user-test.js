import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { setupFactoryGuy, make, mockFindRecord } from 'ember-data-factory-guy';

module('Unit | Service | current-user', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('service will return null for id if there is no user', function(assert) {
    let session = this.owner.lookup('service:session');
    session.set('isAuthenticated', false);

    let currentUser = this.owner.lookup('service:current-user');

    assert.equal(currentUser.get('id'), null, 'Trying to get the current user id when not authenticated should return nothing');
  });

  test('service will return id if there is a user', function(assert) {
    let session = this.owner.lookup('service:session');
    session.set('data', {
      authenticated: {
        access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMiJ9.H2aRRkffDBrCUba2RwVDhNSuDfYCvZrKaK128ht9h9w' // jwt with user id 12
      }
    });

    let currentUser = this.owner.lookup('service:current-user');

    assert.equal(currentUser.get('id'), '12', 'Trying to get the current user id when authenticated should return the id on the jwt token');
  });

  test('service will return current user after the user is authenticated', async function(assert) {
    let session = this.owner.lookup('service:session');
    session.set('isAuthenticated', true);

    let user = make('user');
    mockFindRecord('user').returns({ model: user });

    let currentUser = this.owner.lookup('service:current-user');
    currentUser.set('id', user.get('id'));

    let result = await run(() => {
      return currentUser.get('user');
    });

    assert.equal(result, user, 'The user returned from the service is the correct one');
  });

  test('serivce will return null if the session is not authenticated', function(assert) {
    let session = this.owner.lookup('service:session');
    session.set('isAuthenticated', false);

    let currentUser = this.owner.lookup('service:current-user');
    assert.equal(currentUser.get('user'), null, 'Null is returned for the current user when the session is not authenticated');
  });
});

