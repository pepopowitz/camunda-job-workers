export function register(zbc) {
  zbc.createWorker({
    taskType: 'retrieve-customer-balance',
    taskHandler: retrieveCustomerCreditHandler,
  });
}

function retrieveCustomerCreditHandler(job) {
  const { customerId } = job.variables;
  console.log(`retrieving customer credit for ${customerId}`);

  const customerCredit = parseInt(customerId.replace('cust', ''));
  console.log(`  customer credit: ${customerCredit}`);

  const result = {
    customerCredit,
  };

  return job.complete(result);
}
