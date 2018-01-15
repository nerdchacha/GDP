const router = require('express').Router();
const cors = require('cors');
const dataController = require('../data/controller');
const Cart = require('../entity/Cart');
const Ads = require('../entity/Ads');
const OffersForCustomer = require('../entity/OffersForCustomer');
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
  .then(([allAds, allOffersForCustomer]) => {
    const ads = new Ads();
    ads.setAds(allAds);
    const offersForCustomer = new OffersForCustomer();
    offersForCustomer.setOffersForCustomer(allOffersForCustomer);
    const cart = new Cart();
    cart.setProducts(products);
    const result = cart.calculate(ads.getAds(), offersForCustomer.getOffersForCustomer());
    res.json(result);
    res.end();
  })
  .catch((error) => next(error));
});


module.exports = router;
