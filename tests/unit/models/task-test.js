import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | task', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  module('currentAction', function() {
    test('with only one action it will be the current action', function(assert) {
      let action = make('task-action', { type: 'form' });
      let task = make('task', { clientActions: [action] });
      assert.equal(task.get('currentAction'), action);
    });

    test('with multiple actions, the first uncomplete one is the current action', function(assert) {
      let clientAction = make('task-action', { type: 'approval', order: 1 });
      let solicitorAction = make('task-action', { type: 'document-upload', order: 2 });
      let task = make('task', { clientActions: [clientAction], solicitorActions: [solicitorAction] });
      assert.equal(task.get('currentAction'), clientAction);
    });

    test('with multiple actions, the first uncomplete one is the current action', function(assert) {
      let clientAction = make('task-action', { type: 'approval', order: 1, complete: true });
      let solicitorAction = make('task-action', { type: 'document-upload', order: 2 });
      let task = make('task', { clientActions: [clientAction], solicitorActions: [solicitorAction] });
      assert.equal(task.get('currentAction'), solicitorAction);
    });
  });

  test('currentClientAction is true when the current action is a client action', function(assert) {
    let clientAction = make('task-action');
    let task = make('task', { clientActions: [clientAction] });
    assert.ok(task.currentClientAction);
  });
});
