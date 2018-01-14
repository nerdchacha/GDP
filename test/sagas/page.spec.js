import { expect } from 'chai';
import watchRequestPage, { requestPage } from '../../app/sagas/page';
import { put, takeEvery, call } from 'redux-saga/effects';
import { REQUEST_PAGE, setPage, setNotification, setLoading } from '../../app/actions';

describe('Page saga', function () {
  it('Should listen to REQUEST_PAGE action', function () {
    const pageWatchIterator = watchRequestPage();
    expect(pageWatchIterator.next().value).to.deep.equal(takeEvery(REQUEST_PAGE, requestPage));
  })
})
