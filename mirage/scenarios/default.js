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
  server.createList('conveyance', 3, {
    address() { return server.create('address'); },
    tasks() {
      return [
        server.create('task', 'buyersIdentificaiton'),
        server.create('task', 'chancel'),
        server.create('task', 'mortgageApproval'),
      ];
    },
    buyer,
    solicitor
  });
}
