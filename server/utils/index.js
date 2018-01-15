/**
 * Add selective discounts only on group of products. Applicable for offers like buy 2 get 1 free.
 * Dont apply any discount on product falling out of the group for example
 * 33.33% discount only on 3 products and no discount on 4th product if 4 products are in cart for ad with buy 2 get 1 offer
 * @name calculateDiscountForGroup
 * @function
 * @param costPerAd {number} cost per ad
 * @param numberOfAds {number} number Of Products
 * @param offer {Object} discountPercent and groupSize for that offer
 * @return {number} rounded number
 */
function calculateDiscountForGroup (costPerAd, numberOfAds, offer) {
  const {
    discountPercent,
    groupSize,
  } = offer;
  const numberOfAdsNotEligibleForDiscount = numberOfAds % groupSize;
  const numberOfAdsEligibleForDiscount = numberOfAds - numberOfAdsNotEligibleForDiscount;
  const costOfAdsEligibleForDiscount = (numberOfAdsEligibleForDiscount * costPerAd * ((100 - discountPercent) / 100));
  const costOfAdsNotEligibleForDiscount = numberOfAdsNotEligibleForDiscount * costPerAd;
  return costOfAdsEligibleForDiscount + costOfAdsNotEligibleForDiscount;
}

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
const calculate = (products, ads, offersForCustomer) => {
  const totalAmountBeforeDiscount = Object.keys(products).reduce((accumulatedAmount, adId) => {
    const costPerAd = ads.find((ad) => ad._id.toString() === adId).cost;
    const numberOfAdsInCart = products[adId];
    accumulatedAmount += costPerAd * numberOfAdsInCart;
    return accumulatedAmount;
  }, 0);

  const totalAmountAfterDiscount = Object.keys(products).reduce((accumulatedAmount, adId) => {
    const costPerAd = ads.find((ad) => ad._id.toString() === adId).cost;
    const numberOfAdsInCart = products[adId];
    const offerForCustomerForAd = offersForCustomer.find(({ ad }) => ad._id.toString() === adId) || {};
    const { offer = {} } = offerForCustomerForAd;
    const {
      minimumProductsToAvailDiscount,
      minimumAmountToAvailDiscount,
      discountOnlyOnGroup,
      discountPercent,
    } = offer;
    // Calculations for products that are eligible for a discount
    if ((numberOfAdsInCart >= minimumProductsToAvailDiscount) || (totalAmountBeforeDiscount >= minimumAmountToAvailDiscount)) {
      if (discountOnlyOnGroup) {
        accumulatedAmount += calculateDiscountForGroup(costPerAd, numberOfAdsInCart, offer);
      } else {
        // Apply non group (normal) discount calculations for other products that are eligible for a discount
        accumulatedAmount += (numberOfAdsInCart * costPerAd * ((100 - discountPercent) / 100));
      }
    } else {
      // Return normal cost since products in cart are not eligible for a discount
      accumulatedAmount += costPerAd * numberOfAdsInCart;
    }
    return accumulatedAmount;
  }, 0);
  return {
    amountBeforeDiscount: round(totalAmountBeforeDiscount),
    amountAfterDiscount: round(totalAmountAfterDiscount),
    discount: round(totalAmountBeforeDiscount - totalAmountAfterDiscount),
  };
};


/**
 * Round off decimal numbers to nearest 2 place.
 * @name round
 * @function
 * @param number {number} number to be rounded
 * @return {number} rounded number
 */
function round (number) {
  return (Math.round(number * 100) / 100);
}

module.exports = {
  calculate,
};
