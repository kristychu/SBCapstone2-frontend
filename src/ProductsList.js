import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
import { Card, CardText, CardBody, Button } from "reactstrap";
import { createStep } from "./actions";

function ProductsList({ routineStep, timeOfDay, toggle }) {
  const token = useSelector((st) => st.users.profile.token);
  const decoded = JSON.parse(atob(token.split(".")[1]));
  const username = decoded.username;

  const dispatch = useDispatch();
  const products = useSelector((st) => st.productResults);

  const addProduct = (productId) => {
    dispatch(createStep(username, token, routineStep, timeOfDay, productId));
    toggle();
  };

  return (
    <div>
      {products.length > 0 && <p>{products.length} Results:</p>}
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

export default ProductsList;
