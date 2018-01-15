const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdSchema = new Schema({
  name: String,
  cost: Number,
});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;
