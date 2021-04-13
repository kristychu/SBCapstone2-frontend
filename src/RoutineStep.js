import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProductSearch from "./ProductSearch";
import { getProductDetails, deleteProductFromStep } from "./actions";
import { useSelector, useDispatch } from "react-redux";

function RoutineStep({ routineStep, productId, timeOfDay, id }) {
  const token = useSelector((st) => st.users.profile.token);
  const decoded = JSON.parse(atob(token.split(".")[1]));
  const username = decoded.username;

  const dispatch = useDispatch();
  const savedProducts = useSelector((st) => Object.values(st.products));

  let productBrand;
  let productName;
  for (let p of savedProducts) {
    if (p.id === productId) {
      productBrand = p.productBrand;
      productName = p.productName;
    }
  }
  const handleDelete = () => {
    dispatch(
      deleteProductFromStep(username, token, id, routineStep, timeOfDay)
    );
  };

  //Modal functionality
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (productId) {
      console.log("API CALL FOR PRODUCT INFO!");
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId]);

  return (
    <>
      <td key={id}>
        {productId && (
          <>
            <p>
              {productBrand} {productName}
              <Button color="danger" onClick={handleDelete}>
                Delete
              </Button>
            </p>
          </>
        )}
        {!productId && (
          <Button color="info" onClick={toggle}>
            Find Product
          </Button>
        )}
      </td>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Search for {routineStep}</ModalHeader>
        <ModalBody>
          <ProductSearch
            routineStep={routineStep}
            timeOfDay={timeOfDay}
            toggle={toggle}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
}

export default RoutineStep;
