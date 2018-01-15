const argv = require('./argv');

const port = parseInt(argv.port || process.env.PORT || '5000', 10);
const apiHost = process.env.API_HOST || `http://localhost:${port}/api`;

module.exports = {
  port,
  apiHost,
};
