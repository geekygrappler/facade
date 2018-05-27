import { Response } from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  this.timing = 1000;      // delay for each request, automatically set to 0 during testing

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

  this.post('/token', (schema, request) => {
    if (request.requestBody.includes('solicitor')) {
      // user 1 is a solicitor
      return new Response(200, {}, {
        access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIn0.3IVGWbNupXA5kLyvBHoq7EBzkaKdQRsflg5oc_OXGxQ'
      });
    }
    if (request.requestBody.includes('buyer')) {
      // user 2 is a buyer
      return new Response(200, {}, {
        access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyIn0.Hfisvn6GzGJeWNS_Z72SDV-jPjL18MX18cO0EA4nlcQ'
      });
    }
    if (request.requestBody.includes('new')) {
      // user 5 is first new signup - what a mess
      return new Response(200, {}, {
        access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1In0.pf_3Ff7QNFO7QfY3r409W_Odf2_sMASguQ6zpNXz40Y'
      });
    }
    return new Response(400, {}, {
      'error': 'Wrong email or password try solicitor or buyer'
    });
  });

  this.get('/conveyances', ({ conveyances, users }, request) => {
    let userId = request.queryParams['filter[userId]'];
    let user = users.all().models.find(user => user.id === userId);
    if (user.role === 'solicitor') {
      return conveyances.all().filter((conveyance) => {
        return  conveyance.solicitor.id === userId;
      });
    }
    if (user.role === 'buyer') {
      return conveyances.all().filter((conveyance) => {
        return  conveyance.buyer.id === userId;
      });
    }
    return [];
  });

  this.post('/conveyances');

  this.patch('/tasks/:id');

  this.post('/addresses');

  this.post('/documents');
  this.post('/s3/some/bucket', () => {
    return new Response(200, { Location: 'www.amazon.com/s3/some/bucket/123abc' }, {});
  });

  this.patch('/task-actions/:id');
}
