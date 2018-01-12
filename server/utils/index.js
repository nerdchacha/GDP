const offersConfig = require('../dataSource/offers.json');
const ads = require('../dataSource/ads.json');

/**
 * Calculates total amount after discount for given products.
 * @name calculate
 * @function
 * @param customerId {String} customerId for which amoutn is being calculated
 * @param products {Object} adIds and their respective count to do calculations on
 * {
 *  [adId]: [count],
 *  [adId]: [count],
 * }
 * example
 * {
 *  "0": 2,
 *  "1": 3,
 *  "2": 1
 * }
 * @return {Object} totalAmountBeforeDiscount, totalAmountAfterDiscount and discount amount
 */
const calculate = (customerId, products) => {
  const offerConfigForCustomer = offersConfig.find((offer) => offer.customerId === customerId);
  const totalAmountBeforeDiscount = Object.keys(products).reduce((seed, adId) => {
    const costPerAd = ads.find((ad) => ad.id === adId).cost;
    const numberOfAdsInCart = products[adId];
    seed += costPerAd * numberOfAdsInCart;
    return seed;
  }, 0);
  const totalAmountAfterDiscount = Object.keys(products).reduce((seed, adId) => {
    const offerForAddType = offerConfigForCustomer.offers.find((offer) => offer.adId === adId);
    const numberOfAdsInCart = products[adId];
    const costPerAd = ads.find((ad) => ad.id === adId).cost;
    // No offer available for add type. Calculate normal cost and return
    if (!offerForAddType) {
      seed += costPerAd * numberOfAdsInCart;
      return seed;
    }
    const {
      minimumProductsToAvailDiscount,
      minimumAmountToAvailDiscount,
      discountOnlyOnGroup,
      discountPercent,
      groupSize,
    } = offerForAddType;
    // Calculations for products that are eligible for a discount
    if (numberOfAdsInCart >= minimumProductsToAvailDiscount || totalAmountBeforeDiscount >= minimumAmountToAvailDiscount) {
      // Add selective discounts only on group of products. Applicable for offers like buy 2 get 1 free.
      // Dont apply any discount on product falling out of the group for example
      // 33.33% discount only on 3 products and no discount on 4th product if 4 products are in cart for ad with buy 2 get 1 offer
      if (discountOnlyOnGroup) {
        const numberOfAdsEligibleForDiscount = parseInt(numberOfAdsInCart / groupSize, 10) * groupSize;
        const numberOfAdsNotEligibleForDiscount = numberOfAdsInCart - numberOfAdsEligibleForDiscount;
        const costOfAdsEligibleForDiscount = (numberOfAdsEligibleForDiscount * costPerAd * ((100 - discountPercent) / 100));
        const costOfAdsNotEligibleForDiscount = numberOfAdsNotEligibleForDiscount * costPerAd;
        seed += costOfAdsEligibleForDiscount + costOfAdsNotEligibleForDiscount;
      } else {
        // Apply non group (normal) discount calculations for other products that are eligible for a discount
        seed += (numberOfAdsInCart * costPerAd * ((100 - discountPercent) / 100));
      }
    } else {
      // Return normal cost since products in cart are not eligible for a discount
      seed += costPerAd * numberOfAdsInCart;
    }
    return seed;
  }, 0);
  return {
    amountBeforeDiscount: totalAmountBeforeDiscount,
    amountAfterDiscount: totalAmountAfterDiscount,
    discount: totalAmountBeforeDiscount - totalAmountAfterDiscount,
  };
};

module.exports = {
  calculate,
};
