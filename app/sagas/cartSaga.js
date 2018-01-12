import { put, takeEvery } from 'redux-saga/effects';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, hideCalculations } from 'actions';

function* cart () {
  yield put(hideCalculations());
}

export default function* watchCart () {
  yield takeEvery(ADD_TO_CART, cart);
  yield takeEvery(REMOVE_FROM_CART, cart);
  yield takeEvery(CLEAR_CART, cart);
}
