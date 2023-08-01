// const { getTopology } = require('./functions/getTopology.js');

// const {
//   registerMagic8BallWorkers,
// } = require('./functions/registerMagic8BallWorkers');

// const { startProcessInstance } = require('./functions/startProcessInstance.js');

// this will read configuration from a file named .env -- that file should contain all your environment variables, like "export ZEEBE_ADDRESS='....'"
require('dotenv').config();
const ZB = require('zeebe-node');

const zbc = new ZB.ZBClient();

const customerCredit = 87;

function registerHandler(taskName, handler) {
  zbc.createWorker({
    taskType: taskName,
    taskHandler: handler,
  });
}

registerHandler('retrieve-customer-balance', retrieveCustomerCreditHandler);
function retrieveCustomerCreditHandler(job) {
  console.log(`retrieving customer credit: ${customerCredit}`);

  const result = {
    customerCredit,
  };

  return job.complete(result);
}

registerHandler('apply-credit', applyCreditHandler);
function applyCreditHandler(job) {
  const { customerCredit, orderTotal } = job.variables;

  const remainingBalance = orderTotal - customerCredit;

  console.log(`applying credit: ${remainingBalance} remaining.`);

  const result = {
    remainingBalance,
  };

  return job.complete(result);
}

registerHandler('charge-credit-card', chargeCreditCardHandler);
function chargeCreditCardHandler(job) {
  console.log(`cha ching $$$$$ ${job.variables.remainingBalance}`);

  return job.complete();
}

// and ignore all this stuff....
// getTopology();

// registerMagic8BallWorkers();

// startProcessInstance();
