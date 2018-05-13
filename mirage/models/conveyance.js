import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  buyer: belongsTo('user'),
  solicitor: belongsTo('user'),
  address: belongsTo(),
  tasks: hasMany()
});
