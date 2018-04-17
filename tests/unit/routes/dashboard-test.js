import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupFactoryGuy, mockQuery, buildList } from 'ember-data-factory-guy';

module('Unit | Route | dashboard', function(hooks) {
  setupTest(hooks);
  setupFactoryGuy(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dashboard');
    assert.ok(route);
  });

  test('the model hook returns a users conveyances', async function(assert) {
    let route = this.owner.lookup('route:dashboard');
    let currentUser = this.owner.lookup('service:currentUser');
    currentUser.set('id', '1');
    mockQuery('conveyance').returns({ json: buildList('conveyance', 3) });

    let result = await route.model();
    assert.equal(result.get('length'), 3, 'Returns 3 models');
    assert.equal(result.get('modelName'), 'conveyance', 'Returns conveyance models');
  });
});
