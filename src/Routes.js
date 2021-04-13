import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import TheRoutine from "./TheRoutine";
import { useSelector } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import UserRoutine from "./UserRoutine";
import { Container, Row, Col } from "reactstrap";

function Routes() {
  const error = useSelector((st) => st.users.error);
  if (error) {
    return <h1>Error happened. Please try again later.</h1>;
  }
  return (
    <div className="Routes">
      <Header />
      <Container>
        <Row>
          <Col>
            <main>
              <Switch>
                <Route exact path="/korean-skincare-routine">
                  <TheRoutine />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/user-routine">
                  <UserRoutine />
                </Route>
                <Route exact path="/logout">
                  <Home />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Redirect to="/" />
              </Switch>
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Routes;
