// const { getTopology } = require('./functions/getTopology.js');

import * as retrieveCustomerBalance from './ingo/retrieveCustomerBalance.js';
import * as applyCredit from './ingo/applyCredit.js';
import * as chargeCreditCard from './ingo/chargeCreditCard.js';

// this will read configuration from a file named .env -- that file should contain all your environment variables, like "export ZEEBE_ADDRESS='....'"
import * as dotenv from 'dotenv';
import * as ZB from 'zeebe-node';

dotenv.config();
const zbc = new ZB.ZBClient();

retrieveCustomerBalance.register(zbc);
applyCredit.register(zbc);
chargeCreditCard.register(zbc);
