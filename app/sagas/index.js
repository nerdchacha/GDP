import { all } from 'redux-saga/effects';
import calculationsSaga from './calculations';
import cartSaga from './cartSaga';
import pageSaga from './page';

export default function* rootSaga () {
  yield all([
    calculationsSaga(),
    cartSaga(),
    pageSaga(),
  ]);
}
