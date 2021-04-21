import React, { useEffect } from "react";
import RoutineStep from "./RoutineStep";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStepsForUser } from "./actions";
import { Table } from "reactstrap";

function RoutineList() {
  const token = useSelector((st) => st.users.profile.token);
  if (!token) {
    return (
      <div>
        <p>You need an account to access this page.</p>
        <p>
          Have an account already? <Link to="/login">Login!</Link>
        </p>
        <p>
          Otherwise, <Link to="/register">Register here</Link>.
        </p>
      </div>
    );
  } else {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const username = decoded.username;

    const dispatch = useDispatch();
    const steps = useSelector((st) => st.steps);
    const morningSteps = steps[0];
    const nightSteps = steps[1];

    useEffect(() => {
      console.log("API CALL FOR STEPS!");
      dispatch(getStepsForUser(username, token));
    }, [dispatch, username, token]);

    return (
      <Table>
        <thead>
          <tr key="morning">
            <th>Morning Step</th>
            <th>You are using:</th>
          </tr>
        </thead>
        <tbody>
          {morningSteps ? (
            morningSteps.map(
              ({ stepNumber, routineStep, productId, timeOfDay, stepId }) => (
                <tr key={stepNumber}>
                  <td key={routineStep}>{routineStep}</td>
                  <RoutineStep
                    id={stepId}
                    routineStep={routineStep}
                    productId={productId}
                    timeOfDay={timeOfDay}
                  />
                </tr>
              )
            )
          ) : (
            <tr>
              <RoutineStep />
            </tr>
          )}
        </tbody>
        <thead>
          <tr key="night">
            <th>Night Step</th>
            <th>You are using:</th>
          </tr>
        </thead>
        <tbody>
          {nightSteps ? (
            nightSteps.map(
              ({ stepNumber, routineStep, productId, timeOfDay, stepId }) => (
                <tr key={stepNumber}>
                  <td key={routineStep}>{routineStep}</td>
                  <RoutineStep
                    id={stepId}
                    routineStep={routineStep}
                    productId={productId}
                    timeOfDay={timeOfDay}
                  />
                </tr>
              )
            )
          ) : (
            <tr>
              <RoutineStep />
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default RoutineList;
