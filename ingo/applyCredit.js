export function register(zbc) {
  zbc.createWorker({
    taskType: 'apply-credit',
    taskHandler: applyCreditHandler,
  });
}

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
