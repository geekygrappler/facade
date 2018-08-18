import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo('user'),
  purchaseAddress: belongsTo('address'),
  saleAddress: belongsTo('address'),
  tasks: hasMany()
});
