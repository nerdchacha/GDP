import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import Card from 'components/Card';
import './style.scss';

class Cart extends Component {
  createCartItem = (customerName, { adId, id }) => {
    const { ads } = this.props;
    const ad = ads.find((type) => type._id === adId);
    const { name: adName, cost } = ad;
    return (
      <tr key={id}>
        <td>{customerName}</td>
        <td>{adName}</td>
        <td>{cost}</td>
        <td>1</td>
        <td>
          <FontAwesome name="times" onClick={this.handleRemoveFromCart(id)} />
        </td>
      </tr>
    );
  }
  handleRemoveFromCart = (id) => () => {
    this.props.removeFromCart(id);
  }
  render () {
    const { customer, customers, cart, calculateAmount } = this.props;
    const heading = 'Cart';
    if (!cart.products.length) {
      return (
        <Card heading={heading}>
          <p>Your cart is empty</p>
        </Card>
      );
    }
    const { name: customerName } = customers.find((eachCustomer) => eachCustomer._id === customer);
    const renderCartItems = cart.products.map((cartItem) => this.createCartItem(customerName, cartItem));
    return (
      <Card heading={heading} className="cart">
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Ad</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderCartItems}
          </tbody>
        </Table>
        <Button bsStyle="primary" onClick={calculateAmount}>Calculate Amount</Button>
      </Card>
    );
  }
}

Cart.propTypes = {
  removeFromCart: PropTypes.func.isRequired,
  calculateAmount: PropTypes.func.isRequired,
  customer: PropTypes.string,
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.object),
  }),
  ads: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  })),
  customers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })),
};

export default Cart;
