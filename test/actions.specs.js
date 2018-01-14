import { expect } from 'chai'
import { requestPage, setPage, setLoading, REQUEST_PAGE, SET_PAGE, SET_LOADING } from '../app/actions'

describe('Actions creators: ', function () {
  it('should return correct actions for appropriate action creator', function () {
    expect(requestPage()).to.deep.include({type: REQUEST_PAGE});
    expect(setPage({ name: 'dummy' })).to.deep.include({type: SET_PAGE});
    expect(setLoading(true)).to.deep.include({type: SET_LOADING});
    // TODO: Test all actions
  })

  it('should not return incorrect for appropriate action creator', function () {
    expect(requestPage()).to.not.deep.include({type: SET_PAGE});
    expect(setPage({ name: 'dummy' })).to.not.deep.include({type: SET_LOADING, payload: { name: 'dummy' }});
    expect(setLoading(true)).to.not.deep.include({type: REQUEST_PAGE, payload: true});
    // TODO: Test all actions
  })

  it('should return correct payload with appropriate action creator', function () {
    expect(setPage({ name: 'dummy' })).to.not.deep.equal({type: SET_LOADING, payload: { name: 'dummy' }});
    expect(setLoading(true)).to.deep.equal({type: SET_LOADING, payload: true});
    // TODO: Test all actions
  })
})
