// const { getTopology } = require('./functions/getTopology.js');

const retrieveCustomerBalance = require('./ingo/retrieveCustomerBalance.js');

// const { startProcessInstance } = require('./functions/startProcessInstance.js');

// this will read configuration from a file named .env -- that file should contain all your environment variables, like "export ZEEBE_ADDRESS='....'"
require('dotenv').config();
const ZB = require('zeebe-node');

const zbc = new ZB.ZBClient();

retrieveCustomerBalance.register(zbc);

function registerHandler(taskName, handler) {
  zbc.createWorker({
    taskType: taskName,
    taskHandler: handler,
  });
}

registerHandler('apply-credit', applyCreditHandler);
function applyCreditHandler(job) {
  const { customerCredit, orderTotal } = job.variables;

  let remainingBalance = orderTotal - customerCredit;
  if (remainingBalance < 0) {
    remainingBalance = 0;
  }

  console.log(`applying credit of ${customerCredit}.`);
  console.log(`  remaining balance: ${remainingBalance}.`);

  const result = {
    remainingBalance,
  };

  return job.complete(result);
}

registerHandler('charge-credit-card', chargeCreditCardHandler);
function chargeCreditCardHandler(job) {
  const { cardNumber, cvc, expiryDate, remainingBalance } = job.variables;

  console.log(`cha ching $$$$$`);
  console.log(`  credit card number: ${cardNumber}`);
  console.log(`  cvc: ${cvc}`);
  console.log(`  expiry date: ${expiryDate}`);
  console.log(`  amount: ${remainingBalance}`);

  return job.complete();
}

// and ignore all this stuff....
// getTopology();

// registerMagic8BallWorkers();

// startProcessInstance();
