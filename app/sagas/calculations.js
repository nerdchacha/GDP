import { put, takeEvery, call, select } from 'redux-saga/effects';
import { REQUEST_CALCULATE_AMOUNT, setCalculatedAmount, setNotification, setLoading } from 'actions';
import { GENERIC_MESSAGE } from 'constants.js';

function* requestCalculations () {
  const API_HOST = process.env.API_HOST;
  yield put(setLoading(true));
  try {
    const state = yield select();
    const { cart: { products }, customer } = state;
    const body = {};
    body.products = products;
    body.customer = customer;
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
