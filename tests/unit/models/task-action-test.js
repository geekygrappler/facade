import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | task action', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  module('requiresApproval', function()  {
    test('is true for client upload tasks', function(assert) {
      let client = make('user', { role: 'client' });
      let action = make('task-action', { owner: client, type: 'document-upload' });
      assert.ok(action.requiresApproval, 'Client upload actions require approval');
    });

    test('is false for client form tasks', function(assert)  {
      let client = make('user', { role: 'client' });
      let action = make('task-action', { owner: client, type: 'form' });
      assert.notOk(action.requiresApproval, 'Client form actions do not require approval');
    });

    test('is false for solicitor upload tasks', function(assert)  {
      let solicitor = make('user', { role: 'solicitor' });
      let action = make('task-action', { owner: solicitor, type: 'document-upload' });
      assert.notOk(action.requiresApproval, 'Solicitor upload actions do not require approval');
    });
  });
});
