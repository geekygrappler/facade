import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest, skip } from 'ember-qunit';
import { setupFactoryGuy, mockCreate, mock, mockFindRecord, make } from 'ember-data-factory-guy';
import { JWT } from '../helpers/users';

module('Acceptance | signup', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  test('visiting /signup', async function(assert) {
    await visit('/signup');

    assert.equal(currentURL(), '/signup');
  });

  /**
   * Too complicated without an API, but also factory guys API for mocking requests is not nice.
   */
  skip('signing up will generate a new conveyance with a solicitor and tasks', async function(assert) {
    await visit('/signup');

    mockCreate('user');

    mock({
      type: 'POST',
      url: '/token',
      responseText: { access_token: JWT }
    });

    mockCreate('conveyance');

    let user = make('buyer');
    mockFindRecord('user').returns({ json: user });
    await fillIn('[data-test-first-name-input]', 'Mia');
    await fillIn('[data-test-last-name-input]', 'Corvere');
    await fillIn('[data-test-email-input', 'mia@redchurch.org');
    await fillIn('[data-test-password-input', 'Mister Kindly sat on the mat');
    await fillIn('[data-test-street-input', '123 The Church');
    await fillIn('[data-test-city-input', 'The desert');
    await fillIn('[data-test-postcode-input', 'DE12 3ET');

    await click('[data-test-submit-button]');

    assert.equal(currentURL(), '/login');

    await fillIn('[data-test-email-input', 'mia@redchurch.org');
    await fillIn('[data-test-password-input', 'Mister Kindly sat on the mat');

    await click('[data-test-login-button]');

    mockFindRecord('conveyance', 'withAddress', 'withTasks');

    assert.equal(currentURL(), '/conveyances/1');

    assert.dom('[data-test-solicitor-name]').containsText('Solicitor: ');
  });
});
