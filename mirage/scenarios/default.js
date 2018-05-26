export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // id: 1
  let solicitor = server.create('user', { role: 'solicitor' });
  // id: 2
  let buyer1 = server.create('user', { role: 'buyer' });
  let buyer2 = server.create('user', { role: 'buyer' });
  let buyer3 = server.create('user', { role: 'buyer' });

  server.createList('conveyance', 3, {
    address() { return server.create('address'); },
    tasks() {
      return [
        server.create('task', 'buyersIdentification'),
        server.create('task', 'chancel'),
        server.create('task', 'mortgageApproval'),
      ];
    },
    buyer(i) {
      switch(i) {
        case 0:
          return buyer1;
        case 1:
          return buyer2;
        case 2:
          return buyer3;
      }
    },
    solicitor
  });
}
