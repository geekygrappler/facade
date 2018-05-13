import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupFactoryGuy, mockFindRecord, build } from 'ember-data-factory-guy';
import { JWT } from '../helpers/users';

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

    assert.dom('[data-test-formatted-address]').exists('The address is shown');

    assert.dom('[data-test-conveyance-task]').exists({ count: 3 }, 'The tasks are shown');
  });
});
