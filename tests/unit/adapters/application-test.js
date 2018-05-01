import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | application', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it appends the jwt token to the headers when user is authenticated', function(assert) {
    let adapter = this.owner.lookup('adapter:application');
    let session = this.owner.lookup('service:session');
    session.set('data', {
      authenticated: {
        access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMiJ9.H2aRRkffDBrCUba2RwVDhNSuDfYCvZrKaK128ht9h9w' // jwt with user id 12
      }
    });
    assert.equal(
      adapter.get('headers')['AUTHORIZATION'],
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMiJ9.H2aRRkffDBrCUba2RwVDhNSuDfYCvZrKaK128ht9h9w'
    );
  });
});
