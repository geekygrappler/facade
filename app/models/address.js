import DS from 'ember-data';

export default DS.Model.extend({
  street: DS.attr('string'),
  city: DS.attr('string'),
  postcode: DS.attr('string')
});
