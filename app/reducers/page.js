import { SET_PAGE } from 'actions';

export default function page (state = { ads: [], customers: [] }, action) {
  switch (action.type) {
    case SET_PAGE:
      return action.payload;
    default:
      return state;
  }
}
