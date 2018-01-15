/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const adService = require('./ad/ad.service');
const customerService = require('./customer/customer.service');
const customerOfferService = require('./customerOffer/customerOffer.service');
const offerService = require('./offer/offer.service');

function getPageData () {
  return Promise.all([adService.getAllAds(), customerService.getAllCustomers()])
  .then(([ads, customers]) => ({ads, customers}))
  .catch((error) => {
    // TODO: Log in newrelic instead
    console.log(error);
    throw (error);
  });
}

function getOffersForCustomer (customerId) {
  return customerOfferService.getOffersForCustomer(customerId)
  .catch((error) => {
    // TODO: Log in newrelic instead
    console.log(error);
    throw (error);
  });
}

function getAllAds () {
  return adService.getAllAds()
  .catch((error) => {
    // TODO: Log in newrelic instead
    console.log(error);
    throw (error);
  });
}

module.exports = {
  getPageData,
  getOffersForCustomer,
  getAllAds,
};
