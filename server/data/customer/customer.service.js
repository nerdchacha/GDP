const Customer = require('./customer.model');

function getAllCustomers () {
  return Customer.find({}).lean().exec()
  .then((data) => data);
}

function getCustomerById (id) {
  const query = {};
  query._id = id;
  return Customer.find(query).lean().exec()
  .then((data) => data);
}

module.exports = {
  getAllCustomers,
  getCustomerById,
};
