import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click } from '@ember/test-helpers';
import { setupFactoryGuy, make, mockUpdate } from 'ember-data-factory-guy';

module('Integration | Component | conveyance-task', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders a title', async function(assert) {
    this.set('task', make('task'));
    await render(hbs`
      {{conveyance-task
        task=task
      }}
    `);

    assert.dom('[data-test-title]').containsText('Default Task Title', 'The task\'s title should be displayed');
  });

  test('it renders the status', async function(assert) {
    this.set('task', make('task'));
    await render(hbs`
      {{conveyance-task
        task=task
      }}
    `);

    assert.dom('[data-test-status]').containsText('Status: outstanding', 'The task\'s status should be displayed');
  });

  test('it renders the task\'s description', async function(assert) {
    this.set('task', make('task'));
    await render(hbs`
      {{conveyance-task
        task=task
      }}
    `);

    assert.dom('[data-test-description]').containsText('A default description', 'The task\'s description should be displayed');
  });

  module('for solicitors', function() {
    test('they can toggle the completed value of the task', async function(assert) {
      let task = make('task', { complete: false });
      this.set('task', task);
      this.owner.lookup('service:currentUser').set('user', make('solicitor'));
      mockUpdate(task);
      await render(hbs`
        {{conveyance-task
          task=task
        }}
      `);

      assert.dom('[data-test-completed-toggle]').containsText('Mark Complete', 'The task toggle button shows correct text when task is incomplete');

      await click('[data-test-completed-toggle]');

      assert.ok(task.complete, 'task should be marked as complete after button is clicked');
      assert.dom('[data-test-completed-toggle]').containsText('Mark Outstanding', 'The task toggle button shows correct text when task is complete');

      await click('[data-test-completed-toggle]');
      assert.notOk(task.complete, 'task should be marked as incomplete after button is clicked');
      assert.dom('[data-test-completed-toggle]').containsText('Mark Complete', 'The task toggle button shows correct text when task is incomplete');
    });
  });
});
