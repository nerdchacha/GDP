import { put, takeEvery, call, select } from 'redux-saga/effects';
import { REQUEST_CALCULATE_AMOUNT, setCalculatedAmount, setNotification, setLoading } from 'actions';
import { GENERIC_MESSAGE } from 'constants.js';

function* requestCalculations () {
  const API_HOST = process.env.API_HOST;
  yield put(setLoading(true));
  try {
    const state = yield select();
    const { cart: { products } } = state;
    /* Convert cart products from
    [{adId: 0}, {adId: 0}, {adId: 1}, {adId: 1}, {adId: 1}, {adId: 2}]
    to
    {
      products: {
      "0": 2,
      "1": 3,
      "2": 1
      }
    }
    */
    const body = products.reduce((seed, { adId }) => {
      seed.products[adId] = seed.products[adId] || 0;
      seed.products[adId] += 1;
      return seed;
    }, { products: {} });
    body.customer = state.customer;
    const response = yield call(fetch, `${API_HOST}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = yield call([response, 'json']);
    yield put(setCalculatedAmount(json));
  } catch (e) {
    // Dont swallow the error. Log it into newrelic or any similar service in real life application
    yield put(setNotification({type: 'error', message: GENERIC_MESSAGE}));
  }
  yield put(setLoading(false));
}

export default function* watchRequestCalculations () {
  yield takeEvery(REQUEST_CALCULATE_AMOUNT, requestCalculations);
}
