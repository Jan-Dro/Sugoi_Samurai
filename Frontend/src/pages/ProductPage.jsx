import React from "react";

const ProductPage = ({ product }) => {
  return (
    <div>
      <h2>{product.product_name}</h2>
      <img
        src={`http://localhost:8000${product.image}`}
        alt={product.product_name}
        width="100%"
        height="auto"
      />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button>Back to Products</button>
    </div>
  );
};

export default ProductPage;