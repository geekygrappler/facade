import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  prefix() { return faker.name.prefix(); },
  firstName() { return faker.name.firstName(); },
  lastName() { return faker.name.lastName(); }
});
