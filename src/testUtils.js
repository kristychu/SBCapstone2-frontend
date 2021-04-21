import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

export const makeMockStore = configureStore([thunk]);
