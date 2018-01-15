class Cart {
  constructor () {
    this.products = [];
    this.customer = null;
  }
  setProducts (products) {
    /* Convert
    [{adId: 0}, {adId: 0}, {adId: 1}, {adId: 1}, {adId: 1}, {adId: 2}]
    to
    {
      "0": 2,
      "1": 3,
      "2": 1
    }
    */
    const objectMap = products.reduce((seed, { adId }) => {
      seed[adId] = seed[adId] || 0;
      seed[adId] += 1;
      return seed;
    }, {});
    /*
    Convert
    {
      "0": 2,
      "1": 3,
      "2": 1
    }
    to
    [
      {adId: "0": numberOfAds: 2},
      {adId: "1": numberOfAds: 3},
      {adId: "2": numberOfAds: 1},
    ]
    */
    this.products = Object.keys(objectMap).map((adId) => ({ adId, numberOfAds: objectMap[adId] }));
  }
  /**
   * Calculate total amount where no discount is applied
   * @name _calculateAmountBeforeDiscount
   * @function
   * @return {number} total amount with no discount
   */
  _calculateAmountBeforeDiscount () {
    return this.products.reduce((accumulatedAmount, { adId, numberOfAds }) => {
      const costPerAd = this.ads.find((ad) => ad._id.toString() === adId).cost;
      accumulatedAmount += costPerAd * numberOfAds;
      return accumulatedAmount;
    }, 0);
  }
  /**
   * Calculate total amount where discount is applied
   * @name _calculateAmountBeforeDiscount
   * @function
   * @return {number} total amount after discount
   */
  _calculateAmountAfterDiscount (totalAmountBeforeDiscount) {
    return this.products.reduce((accumulatedAmount, { adId, numberOfAds: numberOfAdsInCart }) => {
      const costPerAd = this.ads.find((ad) => ad._id.toString() === adId).cost;
      const offerForCustomerForAd = this.offersForCustomer.find(({ ad }) => ad._id.toString() === adId) || {};
      const { offer = {} } = offerForCustomerForAd;
      const {
        minimumProductsToAvailDiscount,
        minimumAmountToAvailDiscount,
        discountOnlyOnGroup,
        discountPercent,
        groupSize,
      } = offer;
      // Calculations for products that are eligible for a discount
      if ((numberOfAdsInCart >= minimumProductsToAvailDiscount) || (totalAmountBeforeDiscount >= minimumAmountToAvailDiscount)) {
        if (discountOnlyOnGroup) {
          // Add selective discounts only on group of products. Applicable for offers like buy 2 get 1 free.
          // Dont apply any discount on product falling out of the group for example
          // 33.33% discount only on 3 products and no discount on 4th product if 4 products are in cart for ad with buy 2 get 1 offer
          const numberOfAdsNotEligibleForDiscount = numberOfAdsInCart % groupSize;
          const numberOfAdsEligibleForDiscount = numberOfAdsInCart - numberOfAdsNotEligibleForDiscount;
          const costOfAdsEligibleForDiscount = (numberOfAdsEligibleForDiscount * costPerAd * ((100 - discountPercent) / 100));
          const costOfAdsNotEligibleForDiscount = numberOfAdsNotEligibleForDiscount * costPerAd;
          accumulatedAmount += costOfAdsEligibleForDiscount + costOfAdsNotEligibleForDiscount;
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
  }
  /**
   * Round off decimal numbers to nearest 2 place.
   * @name round
   * @function
   * @param number {number} number to be rounded
   * @return {number} rounded number
   */
  _round (number) {
    return (Math.round(number * 100) / 100);
  }
  /**
   * Calculates total amount after discount for given products.
   * @name calculate
   * @function
   * @return {number} amountBeforeDiscount, amountAfterDiscount and discount after calculation
   */
  calculate (ads, offersForCustomer) {
    this.ads = ads;
    this.offersForCustomer = offersForCustomer;
    const totalAmountBeforeDiscount = this._calculateAmountBeforeDiscount();
    const totalAmountAfterDiscount = this._calculateAmountAfterDiscount(totalAmountBeforeDiscount);
    return {
      amountBeforeDiscount: this._round(totalAmountBeforeDiscount),
      amountAfterDiscount: this._round(totalAmountAfterDiscount),
      discount: this._round(totalAmountBeforeDiscount - totalAmountAfterDiscount),
    };
  }
}

module.exports = Cart;
