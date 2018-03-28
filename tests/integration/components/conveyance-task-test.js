import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | conveyance-task', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders a title', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('task', make('task'));
    await render(hbs`
      {{conveyance-task
        task=task
      }}
    `);

    assert.dom('[data-test-title]').containsText('Default Task Title', 'The task\'s title should be displayed');
  });

  test('it renders the status', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('task', make('task'));
    await render(hbs`
      {{conveyance-task
        task=task
      }}
    `);

    assert.dom('[data-test-status]').containsText('Status: outstanding', `The task's status should be displayed`);
  });

  test('it renders the task\'s description', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('task', make('task'));
    await render(hbs`
      {{conveyance-task
        task=task
      }}
    `);

    assert.dom('[data-test-description]').containsText('A default description', `The task's description should be displayed`);
  });
});
