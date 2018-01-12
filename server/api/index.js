const router = require('express').Router();
const cors = require('cors');
const ads = require('../dataSource/ads.json');
const customers = require('../dataSource/customers.json');
const { calculate } = require('../utils');
router.use(cors());

// TODO: Implement usuing GRAPHQL instead if time allows
router.use('/page', (req, res) => {
  res.json({
    ads,
    customers,
  });
  res.end();
});

router.post('/calculate', (req, res) => {
  const { customer: customerId, products } = req.body;
  const result = calculate(customerId, products);
  res.json(result);
  res.end();
});


module.exports = router;
