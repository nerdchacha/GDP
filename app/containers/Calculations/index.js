import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from 'components/Card';

function Calculations ({ calculations: { amountBeforeDiscount, amountAfterDiscount, discount }, showCalculations }) {
  if (!showCalculations) { return null; }
  return (
    <Card heading="Calculations">
      <p><label>Amount Before Calculations</label> {amountBeforeDiscount}</p>
      <p><label>Amount After Calculations</label> {amountAfterDiscount}</p>
      <p><label>Total Discount</label> {discount}</p>
    </Card>
  );
}

Calculations.propTypes = {
  calculations: PropTypes.shape({
    amountBeforeDiscount: PropTypes.number,
    amountAfterDiscount: PropTypes.number,
    discount: PropTypes.number,
  }),
  showCalculations: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  calculations: state.cart.calculations,
  showCalculations: state.cart.showCalculations,
});

export default connect(mapStateToProps)(Calculations);
