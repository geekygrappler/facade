import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
// import { task } from 'ember-concurrency';

// import td from 'testdouble';

module('Integration | Component | signup-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{signup-form}}`);

    assert.dom('[data-test-signup-form]').exists();
  });

  skip('onSignup is called with the correct data', async function(/*assert*/) {
    let expectedUser = {
      prefix: 'Mr',
      firstName: 'Tony',
      lastName: 'Stark',
      email: 'ironman@starkindustries.com',
      password: 'Pepper'
    };

    let expectedAddress = {
      street: '123 Stark Industries HQ',
      city: 'Manhattan',
      postcode: '123'
    };

    // TODO how to test tasks?
    let onSignup = () => {};
    // let onSignup = task(function *(userData, addressData) {
    //   assert.equal(userData, expectedUser);
    //   assert.equal(addressData, expectedAddress);
    // });
    // Test double override onSignup
    this.set('onSignup', onSignup);
    await render(hbs`{{signup-form onSignup=onSignup}}`);

    await fillIn('[data-test-prefix-select]', expectedUser.prefix);
    await fillIn('[data-test-first-name-input]', expectedUser.firstName);
    await fillIn('[data-test-last-name-input]', expectedUser.lastName);
    await fillIn('[data-test-email-input]', expectedUser.email);
    await fillIn('[data-test-password-input]', expectedUser.password);
    await fillIn('[data-test-street-input]', expectedAddress.street);
    await fillIn('[data-test-city-input]', expectedAddress.city);
    await fillIn('[data-test-postcode-input]', expectedAddress.postcode);

    await click('[data-test-submit-button]');
  });
});
