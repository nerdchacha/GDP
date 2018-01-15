const router = require('express').Router();
const cors = require('cors');
const dataController = require('../data/controller');
const Cart = require('../entity/Cart');
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
  const cart = new Cart();
  cart.setCustomer(customerId);
  cart.setProducts(products);
  cart.calculate()
  .then((result) => {
    res.json(result);
    res.end();
  })
  .catch((error) => next(error));
});


module.exports = router;
