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

  test('it renders the buyer name for solicitors', async function(assert) {
    this.owner.lookup('service:currentUser').set('user', make('solicitor'));
    let conveyance = make('conveyance', { buyer: make('buyer') });

    this.set('conveyance', conveyance);

    await render(hbs`{{conveyance-summary conveyance=conveyance}}`);

    assert.dom('[data-test-buyer-name]').containsText('Mr. Stark');
  });

  test('it renders the solicitor name for buyers', async function(assert) {
    this.owner.lookup('service:currentUser').set('user', make('buyer'));
    let conveyance = make('conveyance', { solicitor: make('solicitor') });

    this.set('conveyance', conveyance);

    await render(hbs`{{conveyance-summary conveyance=conveyance}}`);

    assert.dom('[data-test-solicitor-name]').containsText('Mr. Stark');
  });
});
