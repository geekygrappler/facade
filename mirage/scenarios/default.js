import { defaultSaleTasks, defaultPurchaseTasks, defaultGeneralTasks } from '../utils/default-tasks';


export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // id: 1
  let andy = server.create('user', { email: 'brownie3003@gmail.com', password: 'password' });
  server.create('conveyance', {
    user: andy,
    purchaseAddress: server.create('address'),
    saleAddress: server.create('address'),
    tasks: defaultSaleTasks(server).concat(defaultPurchaseTasks(server), defaultGeneralTasks(server))
  });
}
