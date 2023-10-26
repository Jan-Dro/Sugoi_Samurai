import React, {useState, useEffect, useCallback} from "react";
import {Card, CardBody, CardFooter, Image, Modal, Pagination} from "@nextui-org/react";
import { Link } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import NewItemsCard from "./pages/NewItemsLink";
import AboutUs from "./pages/AboutUs";
import CheckoutForm from "./pages/Cart";


export default function Body() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
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

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    const newTotal = updatedCartItems.reduce(
      (total, item) => total + parseFloat(item.price), 
      0
    );

    setCartItems(updatedCartItems);
    setCartTotal(newTotal);
  };
  
  // ...
  const displayedProducts = products.slice((currentPage - 1) * 12, currentPage * 12)
  return (
    <>
    <NewItemsCard />

    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {displayedProducts.map((product, index) => (
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
    <Pagination
      showControls
      className="pages"
      total={2}
      color="secondary"
      page={currentPage}
      onChange={setCurrentPage}
    />

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
          <button
            type="button"
            onClick={() => handleAddToCart(selectedProduct)}
          >
          Add to Cart
          
          </button>
        </Card>
      </div>
    )}
<div className="cart">
  <h2>Shopping Cart</h2>
  <ul>
    {cartItems.map((item, index) => (
      <li key={index}>
        {item.product_name} - ${item.price}
      </li>
    ))}
  </ul>
    <p>Total: ${cartTotal.toFixed(2)}</p>
    <Link to="/cart?total={newTotal}">Go to Cart</Link>
    </div>
    </>
    
  );
}