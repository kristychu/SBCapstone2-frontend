import { combineReducers } from "redux";
import users from "./users";
import steps from "./steps";
import products from "./products";
import productResults from "./productResults";

const rootReducer = combineReducers({ users, steps, products, productResults });

export default rootReducer;
