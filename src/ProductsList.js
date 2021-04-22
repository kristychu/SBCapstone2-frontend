import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
import { Card, CardText, CardBody, Button, Spinner } from "reactstrap";
import { createStep, clearProductResults } from "./actions";

function ProductsList({ routineStep, timeOfDay, toggle }) {
  //need token and username if user is saving product
  const token = useSelector((st) => st.users.profile.token);
  let username;
  if (token) {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    username = decoded.username;
  }

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
    <>
      {products.length > 0 && (
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
      )}
      {products.length > 0
        ? products.map(({ id, brand, name }) => (
            <div key={id} id={products[id]}>
              <Card>
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
    </>
  );
}

export default ProductsList;
