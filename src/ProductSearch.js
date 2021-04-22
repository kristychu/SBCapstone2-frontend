import React from "react";
import SearchBox from "./SearchBox";
import ProductsList from "./ProductsList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductSearch({ routineStep, timeOfDay, toggle }) {
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
    return (
      <div>
        <SearchBox />
        <ProductsList
          routineStep={routineStep}
          timeOfDay={timeOfDay}
          toggle={toggle}
        />
      </div>
    );
  }
}

export default ProductSearch;
