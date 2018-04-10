import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) { return `Task ${i + 1}`; },
  complete() { return Math.random() <= 0.5; },
  description() { return faker.lorem.sentences(); }
});
