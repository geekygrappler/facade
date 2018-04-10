import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | formatted-address', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('address', make('address'));
    await render(hbs`
      {{formatted-address address=address}}
    `);

    assert.dom('[data-test-formatted-address]').containsText(
      '123 Coldharbour Lane,\nLondon,\nSE19 8LU',
      'The address is correctly formatted over multiple lines'
    );
  });
});
