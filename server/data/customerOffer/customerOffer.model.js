const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const CustomerOfferSchema = new Schema({
  offer: { type: ObjectId, ref: 'Offer' },
  ad: { type: ObjectId, ref: 'Ad' },
  customer: { type: ObjectId, ref: 'Customer' },
});

const CustomerOffer = mongoose.model('CustomerOffer', CustomerOfferSchema);

module.exports = CustomerOffer;
