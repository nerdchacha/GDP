const CustomerOffer = require('./customerOffer.model');

function getOffersForCustomer (customerId) {
  return CustomerOffer
  .find({ customer: customerId })
  .populate('customer ad offer')
  .lean()
  .exec()
  .then((data) => data);
}

module.exports = {
  getOffersForCustomer,
};
