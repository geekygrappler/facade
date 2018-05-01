import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  street() { return faker.address.streetAddress(); },
  city() { return faker.address.city(); },
  postcode() { return faker.address.zipCode(); }
});
