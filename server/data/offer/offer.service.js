const Offer = require('./offer.model');

function getAllOffers () {
  return Offer.find({}).lean().exec()
  .then((data) => data);
}

function getOfferById (id) {
  const query = {};
  query._id = id;
  return Offer.find(query).lean().exec()
  .then((data) => data);
}

module.exports = {
  getAllOffers,
  getOfferById,
};
