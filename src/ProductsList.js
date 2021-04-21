import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Product from "./Product";
import { Card, CardText, CardBody, Button, Spinner } from "reactstrap";
import { createStep, clearProductResults } from "./actions";

function ProductsList({ routineStep, timeOfDay, toggle }) {
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
    const products = useSelector((st) => st.productResults.productResults);
    const isLoading = useSelector((st) => st.productResults.isLoading);

    const addProduct = (productId) => {
      dispatch(createStep(username, token, routineStep, timeOfDay, productId));
      toggle();
    };

    if (isLoading) {
      return (
        <div>
          <Spinner color="primary" />
        </div>
      );
    }

    return (
      <div>
        {products.length > 0 && (
          <>
            <p>
              {products.length} Results:
              <span className="input-group-btn">
                <Button
                  color="danger"
                  onClick={() => dispatch(clearProductResults())}
                >
                  Clear Results
                </Button>
              </span>
            </p>
          </>
        )}
        {products.length > 0
          ? products.map(({ id, brand, name }) => (
              <div key={id} id={products[id]}>
                <Card>
                  {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                  <CardBody>
                    <CardText>
                      <Product id={id} brand={brand} name={name} />
                    </CardText>
                    <Button color="success" onClick={() => addProduct(id)}>
                      Add
                    </Button>
                  </CardBody>
                </Card>
              </div>
            ))
          : `Search for something!`}
      </div>
    );
  }
}

export default ProductsList;
