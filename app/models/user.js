import DS from 'ember-data';
import { computed } from '@ember/object';
import { equal } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';

export default DS.Model.extend({
  role: DS.attr('string'),
  prefix: DS.attr('string'),
  firstName: DS.attr('string'),
  middleNames: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),

  isSolicitor: equal('role', raw('solicitor')),
  isClient: equal('role', raw('client')),

  formattedName: computed('prefix', 'lastName', function() {
    return `${this.prefix} ${this.lastName}`;
  })
});
