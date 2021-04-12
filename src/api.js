import axios from "axios";

//SMALL CHANGE

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SkincareAppApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SkincareAppApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on all skincare steps for a specific user. */
  static async getAllSkincareStepsForUser(username, token) {
    this.token = token;
    let res = await this.request(`steps/${username}`);
    return res.steps;
  }

  /** Get details on one skincare step for a specific user. */
  static async getSkincareStepDetails(username, id, token) {
    this.token = token;
    let res = await this.request(`steps/${username}/${id}`);
    return res.step;
  }

  /** User Signup */
  static async signup({
    username,
    password,
    firstName,
    lastName,
    email,
    profileImg,
  }) {
    let user = { username, password, firstName, lastName, email, profileImg };
    let res = await axios.post(`${BASE_URL}/auth/register`, user);
    return (this.token = res.data);
  }

  /** User Login */
  static async login({ username, password }) {
    let user = { username, password };
    let res = await axios.post(`${BASE_URL}/auth/login`, user);
    return (this.token = res.data);
  }

  /** Get User Profile */
  static async getUser(username, token) {
    const url = `users/${username}`;
    this.token = token;
    let res = await this.request(url);
    return res.user;
  }

  /** Edit User Profile - fields allowed to change: firstName, lastName, email */
  //   static async profileChanges({username, firstName, lastName, email, password}, token) {
  //     const url = `users/${username}`;
  //     this.token = token;
  //     const method = "patch"
  //     let user = { firstName, lastName, email, password };
  //     let res = await this.request(url, user, method);
  //     return res.user
  //   }

  /** Update data for one skincare step for a specific user. */
  static async skincareUpdate(username, id, token) {
    const url = `steps/${username}/${id}`;
    this.token = token;
    const method = "patch";
    let res = await this.request(url, {}, method);
    return res.step;
  }

  /** Delete data for one skincare step for a specific user. */
  static async skincareDelete(username, id, token) {
    const url = `steps/${username}/${id}`;
    this.token = token;
    const method = "delete";
    let res = await this.request(url, {}, method);
    return res.deleted;
  }
}

export default SkincareAppApi;
