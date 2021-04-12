import React from "react";
import SearchBox from "./SearchBox";
import ProductsList from "./ProductsList";

function ProductSearch({ routineStep, timeOfDay, toggle }) {
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

export default ProductSearch;
