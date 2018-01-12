import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Card from 'components/Card';
import Product from 'components/Product';
import Modal from 'components/Modal';
import { DEFAULT_SELECT_VALUE } from 'constants.js';

class ProductList extends Component {
  constructor () {
    super();
    // Save interim customerId in state (newCustomerId) until user confirms on clearing cart
    this.state = { showModal: false, newCustomerId: null };
  }
  handleCustomerChange = (e) => {
    const { customerId, isCartFilled, setCustomer } = this.props;
    const newCustomerId = e.target.value === DEFAULT_SELECT_VALUE ? null : e.target.value;
    // Show confirmation for clearing cart only if a customer was previously selected and the cart has some products in it
    if (customerId && isCartFilled) {
      this.setState({ showModal: true, newCustomerId });
      return;
    }
    // If customer is not already set or cart is empty, change the customer
    setCustomer(newCustomerId);
  }
  handleCustomerChangeConfirm = () => {
    const { setCustomer, clearCart } = this.props;
    setCustomer(this.state.newCustomerId);
    clearCart();
    this.setState({ showModal: false });
  }
  handleAddToCart = (adId) => {
    const { customerId, addToCart } = this.props;
    // Dont add to cart if no customer is choosen
    if (!customerId) { return; }
    addToCart(adId);
  }
  handleModalClose = () => {
    this.setState({ showModal: false });
  }
  createCustomerOptions = ({id, name}) => (
    <option value={id} key={id}>{name}</option>
  )
  createAdProduct = (ad) => (
    <Col md={4} key={ad.id}>
      <Product ad={ad} handleAddToCart={this.handleAddToCart} customerId={this.props.customerId} />
    </Col>
  )
  render () {
    const { ads, customers, customerId } = this.props;
    const { showModal } = this.state;
    const selectedCustomer = customerId || DEFAULT_SELECT_VALUE;
    const adsToRender = ads.map(this.createAdProduct);
    const customerOptions = customers.map(this.createCustomerOptions);
    return (
      <div>
        <Modal
          show={showModal}
          title="Doing this will empty your cart"
          body="Are you sure you want to proceed with this?"
          onCancel={this.handleModalClose}
          onConfirm={this.handleCustomerChangeConfirm}
        />
        <Card heading="GDP Advert">
          <div className="form-group">
            <label>Customer:</label>
            <select className="form-control" value={selectedCustomer} onChange={this.handleCustomerChange}>
              <option value={DEFAULT_SELECT_VALUE}>--select--</option>
              {customerOptions}
            </select>
          </div>
          <Row>
            {adsToRender}
          </Row>
        </Card>
      </div>
    );
  }
}

ProductList.propTypes = {
  setCustomer: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  customerId: PropTypes.string,
  isCartFilled: PropTypes.bool.isRequired,
  customers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })),
  ads: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })),
};

export default ProductList;
