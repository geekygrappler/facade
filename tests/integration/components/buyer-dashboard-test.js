import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, makeList } from 'ember-data-factory-guy';


module('Integration | Component | buyer-dashboard', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders the conveyances', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('conveyances', makeList('conveyance', 3));

    await render(hbs`{{buyer-dashboard conveyances=conveyances}}`);

    assert.dom('[data-test-conveyance-summary]').exists({ count: 3 });
  });
});
