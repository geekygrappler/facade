import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  prefix: DS.attr('string'),
  firstName: DS.attr('string'),
  middleNames: DS.attr('string'),
  lastName: DS.attr('string'),


  formattedName: computed('prefix', 'lastName', function() {
    return `${this.prefix} ${this.lastName}`;
  })
});
