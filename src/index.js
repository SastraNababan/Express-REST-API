import { port, env } from './vars';
import logger from './logger';
import server from './server';
import db from './db';


// make bluebird default Promise
// Promise = require('bluebird'); // eslint-disable-line no-global-assign

// open mongoose connection
db.connect();

// listen to requests
server.listen(port, () => logger.info(`server started on port ${port} (${env})`));

// /**
// * Exports express
// * @public
// */
export default server;

