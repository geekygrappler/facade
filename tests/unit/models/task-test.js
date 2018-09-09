import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | task', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  module('actions', function() {
    test('clientActions only contains actions belonging to a client', function(assert) {
      let client = make('user', { role: 'client' });
      let solicitor = make('user', { role: 'solicitor' });
      let clientAction = make('task-action', { owner: client });
      let solicitorAction = make('task-action', { owner: solicitor });
      let task = make('task', { actions: [clientAction, solicitorAction] });
      assert.deepEqual(task.clientActions, [clientAction]);
    });

    test('solicitorActions only contains actions belonging to a client', function(assert) {
      let client = make('user', { role: 'client' });
      let solicitor = make('user', { role: 'solicitor' });
      let clientAction = make('task-action', { owner: client });
      let solicitorAction = make('task-action', { owner: solicitor });
      let task = make('task', { actions: [clientAction, solicitorAction] });
      assert.deepEqual(task.solicitorActions, [solicitorAction]);
    });
  });

  module('currentAction', function() {
    test('with only one action it will be the current action', function(assert) {
      let action = make('task-action', { type: 'form' });
      let task = make('task', { actions: [action] });
      assert.equal(task.get('currentAction'), action);
    });

    test('with multiple actions, the first uncomplete one is the current action', function(assert) {
      let client = make('user', { role: 'client' });
      let solicitor = make('user', { role: 'solicitor' });
      let clientAction = make('task-action', { owner: client, order: 1 });
      let solicitorAction = make('task-action', { owner: solicitor, order: 2 });
      let task = make('task', { actions: [clientAction, solicitorAction] });
      assert.equal(task.get('currentAction'), clientAction);
    });

    test('with multiple actions, the first uncomplete one is the current action', function(assert) {
      let client = make('user', { role: 'client' });
      let solicitor = make('user', { role: 'solicitor' });
      let clientAction = make('task-action', { owner: client, order: 1, complete: true });
      let solicitorAction = make('task-action', { owner: solicitor, order: 2 });
      let task = make('task', { actions: [clientAction, solicitorAction] });
      assert.equal(task.get('currentAction'), solicitorAction);
    });
  });
});
