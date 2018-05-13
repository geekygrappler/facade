import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('A solicitor user', function(assert) {
    let model = make('solicitor');
    assert.ok(model.isSolicitor, 'A solicitor user can be identified');
  });

  test('A buyer user', function(assert) {
    let model = make('buyer');
    assert.ok(model.isBuyer, 'A buyer user can be identified');
  });

  test('formatted name', function(assert) {
    let model = make('user', { prefix: 'hi', lastName: 'buddy' });
    assert.equal(model.formattedName, 'hi buddy', 'The formatted name is calculated');
  });
});
