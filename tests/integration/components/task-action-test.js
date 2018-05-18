import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | task-action', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);
  test('it renders a document upload task', async function(assert) {
    this.set('action', make('task-action', { type: 'document-upload' }));

    await render(hbs`{{task-action action=action}}`);

    assert.dom('[data-test-document-upload]').exists();
  });

  test('it renders a data entry task', async function(assert) {
    this.set('action', make('task-action', { type: 'data-entry' }));

    await render(hbs`{{task-action action=action}}`);

    assert.dom('[data-test-data-entry]').exists();
  });
});
