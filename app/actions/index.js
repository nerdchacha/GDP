export const REQUEST_PAGE = 'REQUEST_PAGE';
export const SET_PAGE = 'SET_PAGE';
export const SET_LOADING = 'SET_LOADING';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_CUSTOMER = 'SET_CUSTOMER';
export const CLEAR_CART = 'CLEAR_CART';
export const REQUEST_CALCULATE_AMOUNT = 'REQUEST_CALCULATE_AMOUNT';
export const SET_CALCULATIONS = 'SET_CALCULATIONS';
export const HIDE_CALCULATIONS = 'HIDE_CALCULATIONS';

export const requestPage = () => ({
  type: REQUEST_PAGE,
});

export const setPage = (pageData) => ({
  type: SET_PAGE,
  payload: pageData,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setNotification = (type, message) => ({
  type: SET_NOTIFICATION,
  paylod: {type, message},
});

export const addToCart = (adId) => ({
  type: ADD_TO_CART,
  payload: adId,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const setCustomer = (customerId) => ({
  type: SET_CUSTOMER,
  payload: customerId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const calculateAmount = () => ({
  type: REQUEST_CALCULATE_AMOUNT,
});

export const setCalculatedAmount = (amount) => ({
  type: SET_CALCULATIONS,
  payload: amount,
});

export const hideCalculations = () => ({
  type: HIDE_CALCULATIONS,
});
