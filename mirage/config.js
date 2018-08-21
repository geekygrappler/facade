import { Response } from 'ember-cli-mirage';
import { parse } from 'qs';
import { encode } from 'jwt-simple';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 1000;      // delay for each request, automatically set to 0 during testing

  function createDefaultTasks(schema) {
    return [
      schema.tasks.create({
        title: 'Buyers identification',
        description: 'For the purchase we need to confirm your identity. Money laundering etc.',
        buyerActions: [schema.taskActions.create({ type: 'document-upload' })]
      }),
      schema.tasks.create({
        title: 'Chancel repair liability',
        description: 'Chancel repair liability should be bought.',
        solicitorActions: [schema.taskActions.create({ type: 'document-upload' })]
      }),
      schema.tasks.create({
        title: 'Mortgage Approval Document',
        description: 'Please upload the approval of your mortgage.',
      }),
    ];
  }
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.get('/conveyances/:id');

  this.get('/users/:id');
  this.post('/users');

  this.post('/token', ({ users }, request) => {
    let { username, password } = parse(request.requestBody);
    let user = users.findBy({ email: username });
    if (user.password === password) {
      return new Response(200, {}, {
        access_token: encode({ userId: user.id }, 'foo')
      });
    } else {
      return new Response(400, {}, {
        error: 'Wrong email or password'
      });
    }
  });

  this.get('/conveyances', ({ conveyances, users }, request) => {
    let userId = request.queryParams['filter[userId]'];
    let user = users.find(userId);
    if (user) {
      return conveyances.where({ userId: user.id });
    }
    return [];
  });

  /**
   * Assign any new conveyances to our solicitor
   */
  this.post('/conveyances', (schema, request) => {
    let { data } = JSON.parse(request.requestBody);
    let conveyance = schema.conveyances.create({
      customerId: data.relationships.customer.data.id,
      tasks: createDefaultTasks(schema)
    });
    return conveyance;
  }, 201);

  this.patch('/tasks/:id');

  this.post('/addresses');

  this.post('/documents');
  this.post('/s3/some/bucket', () => {
    return new Response(200, { Location: 'www.amazon.com/s3/some/bucket/123abc' }, {});
  });

  this.patch('/task-actions/:id');

  this.post('/customers');
}
