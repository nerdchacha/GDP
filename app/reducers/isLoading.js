import { SET_LOADING } from 'actions';

export default function isLoading (state = false, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}
