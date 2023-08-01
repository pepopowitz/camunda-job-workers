const ZB = require('zeebe-node');

async function startProcessInstance() {
  const zbc = new ZB.ZBClient();

  const result = await zbc.createProcessInstance('Process_magic8ball');
  console.log(result);
}

module.exports = { startProcessInstance };
