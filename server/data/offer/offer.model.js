const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  name: String,
  discountOnlyOnGroup: Boolean,
  discountPercent: Number,
  groupSize: Number,
  minimumAmountToAvailDiscount: Number,
  minimumNumberOfAdsToAvailDiscount: Number,
});

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;
