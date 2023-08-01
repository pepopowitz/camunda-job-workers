const ZB = require('zeebe-node');

function registerWorkers() {
  const zbc = new ZB.ZBClient();

  registerShakeHandler(zbc);
  registerResultPublisher(zbc);
}

function registerShakeHandler(zbc) {
  zbc.createWorker({
    taskType: 'magic8ball_shake',
    taskHandler: handler,
  });

  function handler(job) {
    console.log('Task variables', JSON.stringify(job.variables, null, 2));

    // Task worker business logic goes here
    const updateToBrokerVariables = {
      answer: 'It is certain',
    };

    return job.complete(updateToBrokerVariables);
  }
}

function registerResultPublisher(zbc) {
  zbc.createWorker({
    taskType: 'magic8ball_publish',
    taskHandler: handler,
  });

  function handler(job) {
    console.log('Results', JSON.stringify(job.variables, null, 2));

    return job.complete();
  }
}

module.exports = { registerMagic8BallWorkers: registerWorkers };
