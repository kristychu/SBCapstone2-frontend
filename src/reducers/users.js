const INITIAL_STATE = {
  profile: {},
  error: false,
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOAD_TOKEN":
      return { ...state, profile: action.token };
    case "DELETE_TOKEN":
      return { ...INITIAL_STATE };
    case "ERROR":
      console.log(action.error);
      return { ...state, error: true };
    default:
      return state;
  }
}
