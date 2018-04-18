import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make, makeList } from 'ember-data-factory-guy';

module('Integration | Component | conveyance-summary', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders common information', async function(assert) {
    let tasks = makeList('task', 15);
    let conveyance = make('conveyance', 'withAddress', { tasks });

    this.set('conveyance', conveyance);

    await render(hbs`{{conveyance-summary conveyance=conveyance}}`);

    assert.dom('[data-test-property-address]').exists('Property address is shown');

    assert.dom('[data-test-status').containsText(`${conveyance.numberOfCompleteTasks}/15 tasks complete`);
  });
});
