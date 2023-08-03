export function register(zbc) {
  zbc.createWorker({
    taskType: 'charge-credit-card',
    taskHandler: chargeCreditCardHandler,
  });
}

function chargeCreditCardHandler(job) {
  const { cardNumber, cvc, expiryDate, remainingBalance } = job.variables;

  if (expiryDate.length != 5) {
    console.error('ERROR: Invalid credit card expiry date!');
    return job.error({
      errorCode: 'creditCardChargeError',
      errorMessage: 'Invalid credit card expiry date.',
    });
  }

  console.log(`cha ching $$$$$`);
  console.log(`  credit card number: ${cardNumber}`);
  console.log(`  cvc: ${cvc}`);
  console.log(`  expiry date: ${expiryDate}`);
  console.log(`  amount: ${remainingBalance}`);

  return job.complete();
}
