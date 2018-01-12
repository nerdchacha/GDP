import { put, takeEvery, call } from 'redux-saga/effects';
import { REQUEST_PAGE, setPage, setNotification, setLoading } from 'actions';
import { GENERIC_MESSAGE } from 'constants.js';

function* requestPage () {
  const API_HOST = process.env.API_HOST;
  yield put(setLoading(true));
  try {
    const response = yield call(fetch, `${API_HOST}/page`);
    const json = yield call([response, 'json']);
    yield put(setPage(json));
  } catch (e) {
    // Dont swallow the error. Log it into newrelic or any similar service in real life application
    yield put(setNotification({type: 'error', message: GENERIC_MESSAGE}));
  }
  yield put(setLoading(false));
}

export default function* watchRequestPage () {
  yield takeEvery(REQUEST_PAGE, requestPage);
}
