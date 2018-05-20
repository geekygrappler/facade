import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click, fillIn } from '@ember/test-helpers';
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

  module('buyer actions', function() {
    module('document uploads', function() {

      test('if the task has documents they are shown and the action is not', async function(assert) {
        let document = make('document');
        let action = make('task-action', { type: 'document-upload', documents: [document] });
        let task = make('task', { buyerActions: [ action ] });
        this.set('task', task);
        this.owner.lookup('service:currentUser').set('user', make('buyer'));
        await render(hbs`
          {{conveyance-task
            task=task
          }}
        `);

        assert.dom('[data-test-document-download]').exists({ count: 1 });
        assert.dom('[data-test-buyer-action]').doesNotExist();
      });

      module('as a buyer', function() {
        test('incomplete buyer actions are shown', async function(assert) {
          let task = make('task', { buyerActions: [make('task-action', { type: 'document-upload' })] });
          this.set('task', task);
          this.owner.lookup('service:currentUser').set('user', make('buyer'));
          await render(hbs`
            {{conveyance-task
              task=task
            }}
          `);

          assert.dom('[data-test-buyer-action]').exists({ count: 1 });
          assert.dom('[data-test-document-download]').doesNotExist();
        });
      });

      module('as a solicitor', function() {
        test('message about incomplete buyer actions are shown', async function(assert) {
          let task = make('task', { buyerActions: [make('task-action', { type: 'document-upload' })] });
          this.set('task', task);
          this.owner.lookup('service:currentUser').set('user', make('solicitor'));
          await render(hbs`
            {{conveyance-task
              task=task
            }}
          `);

          assert.dom('[data-test-buyer-action-solicitor-message]').exists({ count: 1 });
        });
      });
    });
  });

  module('notes', function() {
    test('they can be edited', async function(assert) {
      let task = make('task', { complete: false });
      this.set('task', task);

      await render(hbs`
        {{conveyance-task
          task=task
        }}
      `);

      assert.dom('[data-test-task-notes]').exists();
      assert.dom('[data-test-task-notes-editing-view]').doesNotExist();
      await click('[data-test-edit-notes-button]');

      assert.dom('[data-test-task-notes-editing-view]').exists();
      assert.dom('[data-test-task-notes]').doesNotExist();
    });

    test('before editing the save button is disabled, once edited it is enabled', async function(assert) {
      let task = make('task', { complete: false });
      this.set('task', task);

      await render(hbs`
        {{conveyance-task
          task=task
        }}
      `);

      await click('[data-test-edit-notes-button]');

      assert.dom('[data-test-save-notes-button]').hasAttribute('disabled');

      await fillIn('[data-test-task-notes-editing-view]', 'Some new text');

      assert.dom('[data-test-save-notes-button]').doesNotHaveAttribute('disabled');
    });

    test('after editing and trying to edit again the save button is disabled', async function(assert) {
      let task = make('task', { complete: false });
      this.set('task', task);
      mockUpdate(task);

      await render(hbs`
        {{conveyance-task
          task=task
        }}
      `);

      await click('[data-test-edit-notes-button]');

      assert.dom('[data-test-save-notes-button]').hasAttribute('disabled');

      await fillIn('[data-test-task-notes-editing-view]', 'Some new text');

      await click('[data-test-save-notes-button]');

      await click('[data-test-edit-notes-button]');

      assert.dom('[data-test-save-notes-button]').hasAttribute('disabled');
    });

    test('the notes can be edited successfully', async function(assert) {
      let task = make('task', { complete: false });
      this.set('task', task);
      mockUpdate(task);
      await render(hbs`
        {{conveyance-task
          task=task
        }}
      `);

      await click('[data-test-edit-notes-button]');

      await fillIn('[data-test-task-notes-editing-view]', 'Some new text');

      await click('[data-test-save-notes-button]');

      assert.dom('[data-test-task-notes-editing-view]').doesNotExist();

      assert.dom('[data-test-task-notes]').containsText('Some new text');
    });

    test('cancelling note editing resets to the original state', async function(assert) {
      let task = make('task', { complete: false });
      this.set('task', task);
      await render(hbs`
        {{conveyance-task
          task=task
        }}
      `);

      await click('[data-test-edit-notes-button]');

      await fillIn('[data-test-task-notes-editing-view]', 'Some new text');

      await click('[data-test-cancel-note-edit-button]');

      assert.dom('[data-test-task-notes-editing-view]').doesNotExist();

      assert.dom('[data-test-task-notes]').containsText(task.notes);
    });
  });
});
