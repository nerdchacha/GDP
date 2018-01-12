import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import './style.scss';

class Loader extends Component {
  render () {
    const { isLoading } = this.props;
    const renderSpinner = isLoading
    ? (
      <div className="spinner">
        <FontAwesome name="spinner" size="4x" spin />
      </div>
    )
    : null;
    return renderSpinner;
  }
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(Loader);
