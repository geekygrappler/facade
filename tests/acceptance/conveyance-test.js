import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupFactoryGuy, mockFindRecord, build } from 'ember-data-factory-guy';

const JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIn0.3IVGWbNupXA5kLyvBHoq7EBzkaKdQRsflg5oc_OXGxQ'; // jwt with user id 1

module('Acceptance | conveyance', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  test('visiting /conveyances/:id renders information', async function(assert) {
    let session = this.owner.lookup('service:session');
    session.set('isAuthenticated', true);
    session.set('data', {
      authenticated: { access_token: JWT }
    });

    let user = build('user');
    mockFindRecord('user').returns({ json: user });

    mockFindRecord('conveyance', 'withAddress', 'withTasks');

    await visit('/conveyances/1');

    assert.equal(currentURL(), '/conveyances/1', 'the URL is naviagable');

    assert.dom('[data-test-conveyance-header]').containsText('Conveyances', 'The conveyance header is shown');

    assert.dom('[data-test-formatted-address]').exists('The address is shown');

    assert.dom('[data-test-conveyance-task]').exists({ count: 3 }, 'The tasks are shown');
  });
});
