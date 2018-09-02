import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) { return `Task ${i + 1}`; },
  complete: false,
  description() { return faker.lorem.sentences(); },
  notes: 'Some notes that Homeward have written about your task',

  identification: trait({
    title: 'Identification Upload',
    description: 'We need to confirm your identity. Money laundering etc.',
    general: true,
    afterCreate(task, server) {
      task.clientActions = server.createList('task-action', 1, { type: 'document-upload', requiresApproval: true });
    }
  }),
  chancel: trait({
    title: 'Chancel repair liability',
    description: 'Chancel repair liability should be bought.',
    purchase: true,
    afterCreate(task, server) {
      task.clientActions = server.createList('task-action', 1, { type: 'approval', order: 1, description: 'We recommend having searches to find out if your new property sits on Chancellory land. The cost of searches is £135.' });
      task.solicitorActions = server.createList('task-action', 1, { type: 'document-upload', order: 2 });
    }
  }),
  propertyInfo: trait({
    title: 'Property Information Form',
    description: 'General information about the property you are selling',
    sale: true,
    afterCreate(task, server) {
      task.clientActions = server.createList('task-action', 1, { type: 'form' });
    }
  }),
  energyCertificate: trait({
    title: 'Energy Efficiency Certificate',
    description: 'Every sale requires an EEC.',
    sale: true,
    afterCreate(task, server) {
      task.clientActions = server.createList('task-action', 1, { type: 'document-upload', requiresApproval: true });
    }
  }),
  mortgageApproval: trait({
    title: 'Mortgage Approval Document',
    description: 'Please upload the approval of your mortgage.',
    purchase: true,
    afterCreate(task, server) {
      task.clientActions = server.createList('task-action', 1, { type: 'document-upload', requiresApproval: true });
    }
  }),
  purchaseAgents: trait({
    title: 'Purchase property estate agent',
    description: 'We need the details of the estate agent in order to contact the sellers solicitors',
    purchase: true,
    afterCreate(task, server) {
      task.clientActions = server.createList('task-action', 1, { type: 'form' });
    }
  }),
  saleAgents: trait({
    title: 'Your sale estate agent',
    description: 'We need the details of your estate agent in order to contact the buyers solicitors',
    sale: true,
    afterCreate(task, server) {
      task.clientActions = server.createList('task-action', 1, { type: 'form' });
    }
  })
});
