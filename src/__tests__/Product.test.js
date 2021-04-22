import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../reducers/rootReducer";
import { render } from "@testing-library/react";
import Product from "../Product";
import { MemoryRouter } from "react-router";

//USING ACTUAL REDUCER WHICH SHOULD BE EMPTY
const store = createStore(reducer);

it("should render without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    </Provider>
  );
});

it("should match snapshot for no productResults", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should match snapshot if there is data received from API search results and passed as props to component", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Product
          id={1}
          brand={"test product brand"}
          name={"test product name"}
        />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
