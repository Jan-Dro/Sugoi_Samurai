import React from "react";

const ProductPage = ({ product }) => {
  const base_url = import.meta.env.VITE_BASE_URL
  return (
    <div>
      <h2>{product.product_name}</h2>
      <img
        src={`http://${base_url}${product.image}`}
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