import path from 'path';

require('dotenv-safe').load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirationInterval = process.env.JWT_EXPIRATION_MINUTES;
const mongo = {
  uri: process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TESTS
    : process.env.MONGO_URI,
};
const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';


export {
  env,
  port,
  jwtSecret,
  jwtExpirationInterval,
  mongo,
  logs,
};
