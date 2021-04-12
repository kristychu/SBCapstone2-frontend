import React from 'react';

function Product({id, brand, name }){
    return(
        <div key={id}>
            <p><b>Product Brand:</b> {brand}</p>
            <p><b>Product Name:</b> {name}</p>
        </div>
    )
}

export default Product;