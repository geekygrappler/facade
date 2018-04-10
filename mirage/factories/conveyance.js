import { Factory, belongsTo } from 'ember-cli-mirage';

export default Factory.extend({
  address: belongsTo()
});
