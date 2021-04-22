import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../reducers/rootReducer";
import { render } from "@testing-library/react";
import RoutineList from "../RoutineList";
import { MemoryRouter } from "react-router";
import { makeMockStore } from "../testUtils";

//USING ACTUAL REDUCER WHICH SHOULD BE EMPTY
const store = createStore(reducer);

it("should render without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RoutineList />
      </MemoryRouter>
    </Provider>
  );
});

it("should match snapshot for anonymous user", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <RoutineList />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

// CREATING A MOCK STORE AND FAKED DATA
const mockStore = makeMockStore({
  users: {
    profile: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNjE4NDQzNDQ0fQ.8PZOXva_Bztp48k8obLY5sj8k7siJVMTIhftj6509EI",
    },
  },
  steps: [
    [
      {
        stepNumber: 0,
        routineStep: "Makeup Remover and Oil Cleanser",
        timeOfDay: "morning",
        productId: null,
        stepId: null,
      },
      {
        stepNumber: 1,
        routineStep: "Water Based Cleanser",
        timeOfDay: "morning",
        productId: null,
        stepId: null,
      },
      {
        stepNumber: 2,
        routineStep: "Exfoliator",
        timeOfDay: "morning",
        productId: null,
        stepId: null,
      },
    ],
    [
      {
        stepNumber: 11,
        routineStep: "Makeup Remover and Oil Cleanser",
        timeOfDay: "night",
        productId: null,
        stepId: null,
      },
      {
        stepNumber: 12,
        routineStep: "Water Based Cleanser",
        timeOfDay: "night",
        productId: null,
        stepId: null,
      },
      {
        stepNumber: 13,
        routineStep: "Exfoliator",
        timeOfDay: "night",
        productId: null,
        stepId: null,
      },
    ],
  ],
});

it("should match snapshot if logged in", function () {
  const { asFragment } = render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <RoutineList />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
