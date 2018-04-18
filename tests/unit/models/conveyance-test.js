import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | conveyance', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  // Replace this with your real tests.
  test('numberOfCompleted tasks is correct and responds to changes', function(assert) {
    let tasks = [make('task', { complete: true }), make('task', { complete: false })];
    let conveyance = make('conveyance', { tasks });

    assert.equal(conveyance.numberOfCompleteTasks, 1, 'The number of completed tasks is correct');

    tasks[1].set('complete', true);

    assert.equal(conveyance.numberOfCompleteTasks, 2, 'The number of tasks complete is updated when a task is updated');
  });
});
