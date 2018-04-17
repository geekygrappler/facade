export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
  server.create('conveyance', {
    address: server.create('address'),
    tasks: server.createList('task', 3),
    buyer: server.create('user')
  });
}
