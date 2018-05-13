import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | signup', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /signup', async function(assert) {
    await visit('/signup');

    assert.equal(currentURL(), '/signup');

    assert.dom('[data-test-signup-component]').exists();
  });
});
