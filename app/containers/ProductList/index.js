import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ProductList from 'components/ProductList';
import { requestPage, addToCart, setCustomer, clearCart } from 'actions';

function ProductListContainer ({cartProducts, ...rest}) {
  const isCartFilled = !!cartProducts.length;
  return (<ProductList {...rest} isCartFilled={isCartFilled} />);
}

ProductListContainer.propTypes = {
  cartProducts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  ads: state.page.ads,
  customers: state.page.customers,
  customerId: state.customer,
  cartProducts: state.cart.products,
});

const mapDispatchToProps = (dispatch) => ({
  requestPage: () => dispatch(requestPage()),
  addToCart: (adId) => dispatch(addToCart(adId)),
  setCustomer: (customerId) => dispatch(setCustomer(customerId)),
  clearCart: () => dispatch(clearCart()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
