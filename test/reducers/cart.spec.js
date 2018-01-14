import { expect } from 'chai';
import cartReducer from '../../app/reducers/cart';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SET_CALCULATIONS, HIDE_CALCULATIONS } from '../../app/actions';

describe('Cart reducer', function () {
  it('should add item to cart', function () {
    const state = cartReducer({ products: [{id: '0', adId: '0'}] }, {type: ADD_TO_CART, payload: '0'});
    expect(state.products.length).to.equal(2);
  });

  it('should not add item to cart for other actions', function () {
    const oldState = cartReducer({ products: [{id: '0', adId: '0'}] }, {type: HIDE_CALCULATIONS});
    const state = cartReducer(oldState, {type: SET_CALCULATIONS});
    expect(state.products.length).to.equal(1);
  });

  it('should remove item from cart', function () {
    const state = cartReducer({ products: [{id: '0', adId: '0'}, {id: '1', adId: '0'}] }, {type: REMOVE_FROM_CART, payload: '0'});
    expect(state.products.length).to.equal(1);
    expect(state.products).to.deep.equal([{id: '1', adId: '0'}])
  });

  it('should not remove item from cart for other actions', function () {
    const oldState = cartReducer({ products: [{id: '1', adId: '0'}] }, {type: SET_CALCULATIONS});
    const state = cartReducer(oldState, {type: HIDE_CALCULATIONS});
    expect(state.products.length).to.equal(1);
    expect(state.products).to.deep.equal([{id: '1', adId: '0'}])
  });

  it('should empty cart', function () {
    const state = cartReducer({ products: [{id: '0', adId: '0'}, {id: '1', adId: '0'}] }, {type: CLEAR_CART});
    expect(state.products.length).to.equal(0);
  });

  it('should not empty cart for other action', function () {
    const oldState = cartReducer({ products: [{id: '0', adId: '0'}, {id: '1', adId: '0'}] }, {type: ADD_TO_CART, payload: '5'});
    const state = cartReducer(oldState, {type: HIDE_CALCULATIONS});
    expect(state.products.length).to.not.equal(0);
  });

  it('should set calculations', function () {
    const state = cartReducer(undefined, {type: SET_CALCULATIONS, payload: {discount: 555}});
    expect(state.calculations).to.deep.equal({discount: 555});
    expect(state.showCalculations).to.be.true;
  });

  it('should hide calculations', function () {
    const state = cartReducer(undefined, { type: HIDE_CALCULATIONS });
    expect(state.showCalculations).to.be.false;
  });

  it('should not show calculations for other action', function () {
    const state = cartReducer(undefined, { type: CLEAR_CART });
    expect(state.showCalculations).to.be.false;
  });
})
