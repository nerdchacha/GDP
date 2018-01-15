const mongoose = require('mongoose');

function connect () {
  if (process.env.NODE_ENV === 'test') { return; }
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => console.log('Successfullt connected to mongodb')) // eslint-disable-line no-console
  .catch((e) => {
    console.log('Error connecting to mongodb'); // eslint-disable-line no-console
    console.log(e); // eslint-disable-line no-console
  });
}

module.exports = {
  connect,
};
