const router = require('express').Router();
const cors = require('cors');
const { calculate } = require('../utils');
const dataController = require('../data/controller');
router.use(cors());

// TODO: Implement usuing GRAPHQL instead if time allows
router.use('/page', (req, res, next) => {
  dataController.getPageData()
  .then((data) => {
    res.json(data);
    res.end();
  })
  .catch((error) => next(error));
});

router.post('/calculate', (req, res, next) => {
  const { customer: customerId, products } = req.body;
  Promise.all([dataController.getAllAds(), dataController.getOffersForCustomer(customerId)])
  .then(([ads, offersForCustomer]) => calculate(products, ads, offersForCustomer))
  .then((result) => {
    res.json(result);
    res.end();
  })
  .catch((error) => next(error));
});


module.exports = router;
