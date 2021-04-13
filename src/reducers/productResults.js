const INITIAL_STATE = {
  isLoading: false,
  productResults: [],
};

export default function productResults(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LOAD_PRODUCT_RESULTS":
      return {
        ...state,
        isLoading: false,
        productResults: [...action.payload],
      };
    case "CLEAR_PRODUCT_RESULTS":
      return INITIAL_STATE;
    default:
      return state;
  }
}
