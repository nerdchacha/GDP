const Ad = require('./ad.model');

function getAllAds () {
  return Ad.find({}).lean().exec()
  .then((data) => data);
}

function getAdById (id) {
  const query = {};
  query._id = id;
  return Ad.find(query).lean().exec()
  .then((data) => data);
}

module.exports = {
  getAllAds,
  getAdById,
};
