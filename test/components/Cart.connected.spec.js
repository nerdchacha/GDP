import { expect } from 'chai';
import React from 'react'
import { render, renderConnected } from '../tools/renderUtils'
import Cart from '../../app/containers/Cart';

describe('Cart component', function () {
  before(function () {
    // TODO: Use mocha factories
    const store = {
      page: {
        ads: [{_id: '0', name: 'foo', cost: 5}, {_id: '1', name: 'bar', cost: 15}],
        customers: [{_id: '0', name: 'Darth Vadar'}, {_id: '1', name: 'Darth Maul'}],
      },
      cart : {
        products: [{id: 'x', adId: '0'}, {id: 'y', adId: '0'}, {id: 'z', adId: '0'}]
      },
      customer: '0',
    }
    this.wrapper = renderConnected(<Cart />, store);
  });

  it('should have a table', function () {
    expect(this.wrapper.find('Table').length).to.equal(1);
  })

  it('should render 3 items in table', function () {
    expect(this.wrapper.find('tbody tr').length).to.equal(3);
  });

  it('should be able to delete product from cart', function () {
    this.wrapper.find('tbody tr').at(1).find('FontAwesome').simulate('click');
    expect(this.wrapper.find('tbody tr').length).to.equal(2);
  });
})
