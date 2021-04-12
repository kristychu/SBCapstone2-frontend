const INITIAL_STATE = [];

export default function productResults(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOAD_PRODUCT_RESULTS":
      return [...state, ...action.payload];
    case "CLEAR_PRODUCT_RESULTS":
      return INITIAL_STATE;
    default:
      return state;
  }
}
