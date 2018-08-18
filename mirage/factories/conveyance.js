import { Factory, belongsTo, hasMany } from 'ember-cli-mirage';

export default Factory.extend({
  address: belongsTo(),
  tasks: hasMany(),
  user: belongsTo(),
});
