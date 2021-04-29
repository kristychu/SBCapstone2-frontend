import axios from "axios";
import {
  LOAD_TOKEN,
  ERROR,
  IS_LOADING,
  LOAD_PRODUCT_RESULTS,
  CLEAR_PRODUCT_RESULTS,
  LOAD_PRODUCT_DETAILS,
  LOAD_ALL_STEPS,
  ADD_STEP,
  DELETE_STEP,
  RESET_ALL,
} from "./actionTypes";

/** USER ACTIONS
 * - Login
 * - Register
 * - Logout
 */

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
// const EXTERNAL_API_URL = "https://skincare-api.herokuapp.com";

export function login(userData) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, userData);
      dispatch(loadToken(res.data));
    } catch (e) {
      dispatch(gotError(e));
    }
  };
}

export function register(userData) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, userData);
      dispatch(loadToken(res.data));
    } catch (e) {
      dispatch(gotError(e));
    }
  };
}

export const loadToken = (token) => ({ type: LOAD_TOKEN, token });
export const gotError = (error) => ({ type: ERROR, error });
export const logout = () => ({ type: RESET_ALL });

/** Reset all stores */
function resetAll() {
  return { type: RESET_ALL };
}

export { resetAll };

/** PRODUCT SEARCH ACTIONS
 * - Clear Products Results from product search
 * - Load Products Results from product search
 */

export function search(term) {
  return async function (dispatch) {
    try {
      dispatch(fetchAPI());
      const query = term.split(" ").join("+");
      const res = await axios.get(`product?q=${query}`);
      dispatch(clearProductResults());
      dispatch(loadProductResults(res.data));
    } catch (e) {
      dispatch(gotError(e));
    }
  };
}

export const fetchAPI = () => ({ type: IS_LOADING });
export const loadProductResults = (products) => ({
  type: LOAD_PRODUCT_RESULTS,
  payload: products,
});
export const clearProductResults = () => ({ type: CLEAR_PRODUCT_RESULTS });

/** STEP ACTIONS (for 1 user)
 * - Load all steps
 * - Create/add step
 * - Delete step
 */

export function getStepsForUser(username, token) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${BASE_URL}/api/steps/${username}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(loadSteps(res.data));
    } catch (e) {
      dispatch(gotError(e));
    }
  };
}

export function createStep(username, token, routineStep, timeOfDay, productId) {
  return async function (dispatch) {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/steps/${username}`,
        {
          routineStep,
          timeOfDay,
          productId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(addStep(res.data));
    } catch (e) {
      dispatch(gotError(e));
    }
  };
}

export function deleteProductFromStep(
  username,
  token,
  id,
  routineStep,
  timeOfDay
) {
  return async function (dispatch) {
    try {
      await axios.delete(`${BASE_URL}/api/steps/${username}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(removeProductFromStep(routineStep, timeOfDay));
    } catch (e) {
      dispatch(gotError(e));
    }
  };
}

export const loadSteps = (steps) => ({ type: LOAD_ALL_STEPS, payload: steps });
export const addStep = (step) => ({ type: ADD_STEP, payload: step });
export const removeProductFromStep = (routineName, time) => ({
  type: DELETE_STEP,
  payload: { routineName, time },
});

/** PRODUCT ACTIONS
 * - Load Product Details
 */

export function getProductDetails(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`products/${id}`);
      console.log(res.data);
      let {
        brand: productBrand,
        name: productName,
        ingredients: productIngredients,
      } = res.data;

      const product = { id, productBrand, productName, productIngredients };
      dispatch(loadProductDetails(product));
    } catch (e) {
      dispatch(gotError(e));
    }
  };
}

export const loadProductDetails = (productInfo) => ({
  type: LOAD_PRODUCT_DETAILS,
  payload: productInfo,
});
