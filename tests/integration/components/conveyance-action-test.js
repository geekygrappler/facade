import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | conveyance-action', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  module('document uploads', function() {
    module('for the action owner', function() {
      test('if the task has documents they are shown and the action is not', async function(assert) {
        let document = make('document');
        let action = make('task-action', { type: 'document-upload', documents: [document] });
        this.set('action', action);
        await render(hbs`
          {{conveyance-action
            action=action
            isOwner=true
          }}
        `);

        assert.dom('[data-test-document-download]').exists({ count: 1 });
        assert.dom('[data-test-document-upload-component]').doesNotExist();
        assert.dom('[data-test-upload-more-documents]').exists();
      });
      test('if the task doesn\'t have documents the upload section is shown', async function(assert) {
        let action = make('task-action', { type: 'document-upload' });
        this.set('action', action);
        await render(hbs`
          {{conveyance-action
            action=action
            isOwner=true
          }}
        `);

        assert.dom('[data-test-document-upload-component]').exists({ count: 1 });
        assert.dom('[data-test-document-download]').doesNotExist();
      });

      module('for the non-owner', function() {
        test('message about incomplete owner actions are shown', async function(assert) {
          let action = make('task-action', { type: 'document-upload' });
          this.set('action', action);
          await render(hbs`
            {{conveyance-action
              action=action
              isOwner=false
            }}
          `);

          assert.dom('[data-test-non-owner-message]').exists({ count: 1 });
          assert.dom('[data-test-non-owner-message]').containsText('Awaiting document upload');
        });
      });
    });
  });

});