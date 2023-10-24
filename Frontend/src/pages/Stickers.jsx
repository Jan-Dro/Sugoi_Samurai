import Appbar from "../NavBar";
import React, { useState, useEffect } from 'react';
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
// export default function Stickers(props){

//       const [products, setProducts] = useState([]);
    
//       useEffect(() => {
//         const apiUrl = `http://localhost:8000/api/products/`;

//         fetch(apiUrl)
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             return response.json();
//           })
//           .then((data) => {
//             setProducts(data);
//           })
//           .catch((error) => {
//             console.error('Error fetching products:', error);
//           });
//       }, []);
    
//       return (
//         <>
//         <Appbar />
//         <div>
//         {products.map((product) => (
//             <div key={product.product_id}>
//                 <h2>{product.product_name}</h2>
//                 <p>{product.price}</p>
//                 <img src={`http://localhost:8000${product.image}`} alt={product.product_name} />
//             </div>
//             ))}
//         </div>
//         </>
//       );
//     }
    

export default function Stickers(props) {
    const [products, setProducts] = useState([]);
  
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
  
    return (
      <>
        <Appbar />
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {products.map((product, index) => (
            <Card shadow="sm" key={index}>
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
      </>
    );
  }