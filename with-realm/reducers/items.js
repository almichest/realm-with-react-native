import { SET_ITEMS } from '../actions/items';

const INITIAL_STATE = {
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case SET_ITEMS:
    return {
      ...state,
      items: action.items,
    }
    default:
    return state;
  }
};
