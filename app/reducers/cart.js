import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SET_CALCULATIONS, HIDE_CALCULATIONS } from 'actions';
import uuid from 'uuid/v4';

export default function cart (state = { products: [], calculations: {}, showCalculations: false }, action) {
  const products = state.products.slice();
  switch (action.type) {
    case ADD_TO_CART:
      products.push({id: uuid(), adId: action.payload});
      return Object.assign({}, state, { products });
    case CLEAR_CART:
      return Object.assign({}, state, { products: [] });
    case REMOVE_FROM_CART:
      return Object.assign({}, state, { products: products.filter((product) => product.id !== action.payload) });
    case SET_CALCULATIONS:
      return Object.assign({}, state, { calculations: action.payload, showCalculations: true });
    case HIDE_CALCULATIONS:
      return Object.assign({}, state, { showCalculations: false });
    default:
      return state;
  }
}
