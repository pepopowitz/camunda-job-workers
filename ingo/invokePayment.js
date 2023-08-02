import { Duration } from 'zeebe-node';

let _zbc;

export function register(zbc) {
  zbc.createWorker({
    taskType: 'payment-invocation',
    taskHandler: invokePaymentHandler,
  });
  _zbc = zbc;
}

function invokePaymentHandler(job) {
  const { orderId } = job.variables;
  console.log(`handling invoke-payment for order ${orderId}`);

  _zbc.publishMessage({
    correlationKey: orderId,
    name: 'paymentRequestMessage',
    variables: job.variables,
    timeToLive: Duration.seconds.of(10), // seconds
  });

  return job.complete();
}
