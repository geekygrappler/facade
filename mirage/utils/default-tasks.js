export function defaultSaleTasks(server) {
  return [
    server.create('task', 'propertyInfo'),
    server.create('task', 'energyCertificate'),
    server.create('task', 'saleAgents')
  ];
}

export function defaultPurchaseTasks(server) {
  return [
    server.create('task', 'chancel'),
    server.create('task', 'mortgageApproval'),
    server.create('task', 'purchaseAgents')
  ];
}

export function defaultGeneralTasks(server) {
  return [server.create('task', 'identification')];
}