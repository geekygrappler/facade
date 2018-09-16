import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | buyer-action', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  module('document uploads', function() {

    test('if the task has documents they are shown and the action is not', async function(assert) {
      let document = make('document');
      let action = make('task-action', { type: 'document-upload', documents: [document] });
      this.set('action', action);
      this.owner.lookup('service:currentUser').set('user', make('buyer'));
      await render(hbs`
        {{buyer-action
          action=action
        }}
      `);

      assert.dom('[data-test-document-download]').exists({ count: 1 });
      assert.dom('[data-test-document-upload-component]').doesNotExist();
    });

    module('as a buyer', function() {
      test('incomplete buyer actions are shown', async function(assert) {
        let action = make('task-action', { type: 'document-upload' });
        this.set('action', action);
        this.owner.lookup('service:currentUser').set('user', make('buyer'));
        await render(hbs`
          {{buyer-action
            action=action
          }}
        `);

        assert.dom('[data-test-document-upload-component]').exists({ count: 1 });
        assert.dom('[data-test-document-download]').doesNotExist();
      });
    });

    module('as a solicitor', function() {
      test('message about incomplete buyer actions are shown', async function(assert) {
        let action = make('task-action', { type: 'document-upload' });
        this.set('action', action);
        this.owner.lookup('service:currentUser').set('user', make('solicitor'));
        await render(hbs`
          {{buyer-action
            action=action
          }}
        `);

        assert.dom('[data-test-document-upload-component-solicitor-message]').exists({ count: 1 });
      });
    });
  });

});
