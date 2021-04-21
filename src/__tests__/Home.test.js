import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../reducers/rootReducer";
import { render } from "@testing-library/react";
import Home from "../Home";
import { MemoryRouter } from "react-router";
import { makeMockStore } from "../testUtils";
import jwt_decode from "jwt-decode";

const store = createStore(reducer);

// CREATING A MOCK STORE AND FAKED DATA
const mockStore = makeMockStore({
  profile: {
    isAuthenticated: false,
    token: {},
    loading: false,
  },
});

const mockLoginData = {
  email: "test@example.com",
  password: "testpassword",
};

const mockResponse = {
  success: true,
  token: "Bearer eyJhbGciOiJIUzI.eyJpZCI6IjVjN.1Tn8FLJEGGE8",
};

// CREATING MOCKS
// jest.mock("../../utils/setAuthToken", () => jest.fn());

// jest.mock("jwt-decode");

// jest.mock("../../lib/api", () => ({
//   post: jest.fn(() => Promise.resolve(mockResponse))
// }));

// JEST TESTS
it("should render without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
});

it("should match snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
