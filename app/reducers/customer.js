import { SET_CUSTOMER } from 'actions';

export default function customer (state = null, action) {
  switch (action.type) {
    case SET_CUSTOMER:
      return action.payload;
    default:
      return state;
  }
}
