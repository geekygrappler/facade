export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // id: 1
  let solicitor = server.create('user', { role: 'solicitor' });
  // id: 2
  let buyer = server.create('user', { role: 'buyer' });

  // server.createList('post', 10);
  server.create('conveyance', {
    address: server.create('address'),
    tasks: server.createList('task', 3),
    buyer,
    solicitor
  });
}
