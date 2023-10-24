


import React, {useState, useEffect} from "react";
import {Card, CardBody, CardFooter, Image, Modal} from "@nextui-org/react";
import ProductPage from "./pages/ProductPage";


export default function Body() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/api/products';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);


  const openProductPage = (product) => {
    setSelectedProduct(product);
  };
  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <>
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {products.map((product, index) => (
          <Card shadow="sm" key={index} isPressable onClick={() => openProductPage(product)}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={product.product_name}
                className="w-full h-[140px] object-contain"
                src={`http://localhost:8000${product.image}`}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{product.product_name}</b>
              <p className="text-default-500">{product.price}</p>
            </CardFooter>
          </Card>
      ))}
    </div>

    {selectedProduct && (
      <div className="product-details-container">
        <Card shadow="sm" className="product-details">
          <button onClick={closeProductDetails}>Close</button>
          <h2>{selectedProduct.product_name}</h2>
          <img
            src={`http://localhost:8000${selectedProduct.image}`}
            alt={selectedProduct.product_name}
            width="100%"
            height="auto"
          />
          <p>{selectedProduct.description}</p>
          <p>Price: {selectedProduct.price}</p>
          <button>Add to Cart</button>
        </Card>
      </div>
    )}
    </>
  );
}