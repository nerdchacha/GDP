import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import { requestPage } from 'actions';
import Loader from 'containers/Loader';
import Cart from 'containers/Cart';
import ProductList from 'containers/ProductList';
import Calculations from 'containers/Calculations';

class App extends Component {
  componentDidMount () {
    this.props.requestPage();
  }
  render () {
    return (
      <div>
        <Loader />
        <Grid>
          <ProductList />
          <Cart />
          <Calculations />
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  requestPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestPage: () => dispatch(requestPage()),
});

export default connect(null, mapDispatchToProps)(App);
