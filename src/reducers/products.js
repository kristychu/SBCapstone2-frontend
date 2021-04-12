const INITIAL_STATE = {};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOAD_PRODUCT_DETAILS":
      return { ...state, [action.payload.id]: { ...action.payload } };
    default:
      return state;
  }
}
