import React from 'react';
import { connect } from 'react-redux';

import Cart from 'components/Cart';
import { removeFromCart, calculateAmount } from 'actions';

function CartContainer (props) {
  return (<Cart {...props} />);
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  ads: state.page.ads,
  customers: state.page.customers,
  customer: state.customer,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (id) => dispatch(removeFromCart(id)),
  calculateAmount: () => dispatch(calculateAmount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
