import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) { return `Task ${i + 1}`; },
  complete: false,
  description() { return faker.lorem.sentences(); },
  notes() { return faker.lorem.sentences(); },

  buyersIdentificaiton: trait({
    title: 'Buyers identification',
    description: 'Please upload proof of your identity.',
  }),
  chancel: trait({
    title: 'Chancel repair liability',
    description: 'Chancel repair liability should be bought.',
  }),
  mortgageApproval: trait({
    title: 'Mortgage Approval Document',
    description: 'Please upload the approval of your mortgage.',
  }),
});
