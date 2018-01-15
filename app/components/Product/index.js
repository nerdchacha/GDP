import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './style.scss';

class Product extends Component {
  handleAddToCart = () => {
    const { handleAddToCart, ad: { _id } } = this.props;
    handleAddToCart(_id);
  }
  render () {
    const { ad: { name, cost } = {}, customerId } = this.props;
    const buttonClass = customerId ? '' : 'disabled';
    return (
      <div className="box">
        <div className="banner">
          <h2>{name}</h2>
          <p><label>cost/ad:</label> {`$${cost}`}</p>
        </div>
        <FontAwesome name="plus" className={buttonClass} onClick={this.handleAddToCart} />
      </div>
    );
  }
}

Product.propTypes = {
  customerId: PropTypes.string,
  handleAddToCart: PropTypes.func.isRequired,
  ad: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};

export default Product;
