import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | conveyance-action', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  module('document uploads', function() {
    module('for the action owner', function(hooks) {
      hooks.beforeEach(function() {
        this.owner.lookup('service:currentUser').set('user', make('buyer'));
        this.set('actionOwner', 'buyer');
      });
      test('if the task has documents they are shown and the action is not', async function(assert) {
        let document = make('document');
        let action = make('task-action', { type: 'document-upload', documents: [document] });
        this.set('action', action);
        await render(hbs`
          {{conveyance-action
            action=action
            owner=actionOwner
          }}
        `);

        assert.dom('[data-test-document-download]').exists({ count: 1 });
        assert.dom('[data-test-buyer-action]').doesNotExist();
      });
      test('if the task doesn\'t have documents the upload section is shown', async function(assert) {
        let action = make('task-action', { type: 'document-upload' });
        this.set('action', action);
        this.owner.lookup('service:currentUser').set('user', make('buyer'));
        await render(hbs`
          {{conveyance-action
            action=action
            owner=actionOwner
          }}
        `);

        assert.dom('[data-test-buyer-action]').exists({ count: 1 });
        assert.dom('[data-test-document-download]').doesNotExist();
      });

      module('for the non-owner', function(hooks) {
        hooks.beforeEach(function() {
          this.owner.lookup('service:currentUser').set('user', make('solicitor'));
          this.set('actionOwner', 'buyer');
        });
        test('message about incomplete owner actions are shown', async function(assert) {
          let action = make('task-action', { type: 'document-upload' });
          this.set('action', action);
          await render(hbs`
            {{conveyance-action
              action=action
              owner=actionOwner
            }}
          `);

          assert.dom('[data-test-non-owner-message]').exists({ count: 1 });
          assert.dom('[data-test-non-owner-message]').containsText('Awaiting buyer to upload documents');
        });
      });
    });
  });

});