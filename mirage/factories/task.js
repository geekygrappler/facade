import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) { return `Task ${i + 1}`; },
  complete: false,
  description() { return faker.lorem.sentences(); },
  notes() { return faker.lorem.sentences(); },

  buyersIdentification: trait({
    title: 'Buyers identification',
    description: 'For the purchase we need to confirm your identity. Money laundering etc.',
    afterCreate(task, server) {
      task.buyerActions = server.createList('task-action', 1, { type: 'document-upload' });
    }
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
