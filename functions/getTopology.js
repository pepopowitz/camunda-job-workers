const ZB = require('zeebe-node');

async function getTopology() {
  const zbc = new ZB.ZBClient();
  const topology = await zbc.topology();

  console.log(JSON.stringify(topology, null, 2));
}

module.exports = { getTopology };
