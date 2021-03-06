/* eslint consistent-return:0 */

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const resolve = require('path').resolve;

const logger = require('./logger');
const argv = require('./argv');
const port = require('./config').port;
const setup = require('./middlewares/frontendMiddleware');
const app = express();
const mongodb = require('./mongoConfig');

mongodb.connect();

app.use(bodyParser.json());
app.use('/api', require('./api'));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  console.log('server is listening on port', port); // eslint-disable-line no-console
});
