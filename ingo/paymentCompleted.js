let _zbc;

export function register(zbc) {
  zbc.createWorker({
    taskType: 'payment-completion',
    taskHandler: paymentCompletedHandler,
  });
  _zbc = zbc;
}

function paymentCompletedHandler(job) {
  const { orderId } = job.variables;
  console.log(`payment completed for order ${orderId}!`);

  _zbc.publishMessage({
    correlationKey: orderId,
    name: 'paymentCompletedMessage',
    variables: job.variables,
  });

  return job.complete();
}
