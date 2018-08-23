export function defaultSaleTasks(server) {
  return [server.create('task', 'propertyInfo'), server.create('task', 'energyCertificate')];
}

export function defaultPurchaseTasks(server) {
  return [server.create('task', 'chancel'), server.create('task', 'mortgageApproval')];
}

export function defaultGeneralTasks(server) {
  return [server.create('task', 'identification')];
}