const INITIAL_STATE = [];

export default function steps(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOAD_ALL_STEPS":
      return action.payload.steps;
    case "ADD_STEP":
      let { routineStep, timeOfDay, productId, stepId } = action.payload.step;
      const morningSteps = state[0];
      const nightSteps = state[1];
      if (timeOfDay === "morning") {
        let morningStepAdded = morningSteps.find(
          (s) => s.routineStep === routineStep
        );
        morningStepAdded.productId = productId;
        morningStepAdded.stepId = stepId;
        return [...state];
      } else {
        let nightStepAdded = nightSteps.find(
          (s) => s.routineStep === routineStep
        );
        nightStepAdded.productId = productId;
        nightStepAdded.stepId = stepId;
        return [...state];
      }
    case "DELETE_STEP":
      let { routineName, time } = action.payload;
      const morningStepNames = state[0];
      const nightStepNames = state[1];
      if (time === "morning") {
        let morningStepToDelete = morningStepNames.find(
          (s) => s.routineStep === routineName
        );
        morningStepToDelete.productId = null;
        morningStepToDelete.stepId = null;
        return [...state];
      } else {
        let nightStepToDelete = nightStepNames.find(
          (s) => s.routineStep === routineName
        );
        nightStepToDelete.productId = null;
        nightStepToDelete.stepId = null;
        return [...state];
      }
    default:
      return state;
  }
}
