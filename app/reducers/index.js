import { combineReducers } from 'redux';
import cart from './cart';
import customer from './customer';
import isLoading from './isLoading';
import page from './page';

export default combineReducers({
  cart,
  customer,
  isLoading,
  page,
});
