export function register(zbc) {
  zbc.createWorker({
    taskType: 'charge-credit-card',
    taskHandler: chargeCreditCardHandler,
  });
}

function chargeCreditCardHandler(job) {
  const { cardNumber, cvc, expiryDate, remainingBalance } = job.variables;

  console.log(`cha ching $$$$$`);
  console.log(`  credit card number: ${cardNumber}`);
  console.log(`  cvc: ${cvc}`);
  console.log(`  expiry date: ${expiryDate}`);
  console.log(`  amount: ${remainingBalance}`);

  return job.complete();
}
