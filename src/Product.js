import React from "react";

function Product({ id, brand, name }) {
  return (
    <span key={id}>
      {brand} {name}
    </span>
  );
}

export default Product;
