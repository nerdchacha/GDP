import { expect } from 'chai';
import watchRequestPage, { requestPage } from '../../app/sagas/page';
import { put, takeEvery, call } from 'redux-saga/effects';
import { REQUEST_PAGE, REQUEST_CALCULATE_AMOUNT, setPage, setNotification, setLoading } from '../../app/actions';

describe('Page saga', () => {
  it('Should listen to REQUEST_PAGE action', () => {
    const pageWatchIterator = watchRequestPage();
    expect(pageWatchIterator.next().value).to.deep.equal(takeEvery(REQUEST_PAGE, requestPage));
  });

  it('Should not listen to other action', () => {
    const pageWatchIterator = watchRequestPage();
    expect(pageWatchIterator.next().value).to.not.deep.equal(takeEvery(REQUEST_CALCULATE_AMOUNT, requestPage));
  });

  it('Should set loader when fetching page data', () => {
    const pageIterator = requestPage();
    expect(pageIterator.next().value).to.deep.equal(put(setLoading(true)));
  });

  it('Should make API call to fetch page data', () => {
    const pageIterator = requestPage();
    pageIterator.next();
    expect(pageIterator.next().value).to.deep.equal(call(fetch, `${process.env.API_HOST}/page`));
  });

  it('Should dispatch SET_PAGE action', () => {
    const pageIterator = requestPage();
    pageIterator.next();
    pageIterator.next();
    pageIterator.next({ json: () => {} });
    expect(pageIterator.next({}).value).to.deep.equal(put(setPage({})));
  });

  it('Should set loader to false after API response', () => {
    const pageIterator = requestPage();
    pageIterator.next();
    pageIterator.next();
    pageIterator.next({ json: () => {} });
    pageIterator.next(10);
    expect(pageIterator.next().value).to.deep.equal(put(setLoading(false)));
  });
});
