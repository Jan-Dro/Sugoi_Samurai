// import React, { useState, useEffect } from "react";
// import Appbar from "../NavBar";
// import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "../payments/CartForm";
// import '../index.css'
// const stripePromise = loadStripe('pk_test_...'); // Replace with your actual Stripe publishable key

// export default function Cart() {
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);

//   // Simulated cart items
//   const products = [
//     { id: 1, name: 'Product 1', price: 10 },
//     { id: 2, name: 'Product 2', price: 20 },
//     { id: 3, name: 'Product 3', price: 15 },
//   ];

//   // Add item to cart
//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   // Calculate total price
//   useEffect(() => {
//     const newTotal = cart.reduce((acc, item) => acc + item.price, 0);
//     setTotal(newTotal);
//   }, [cart]);

//   return (
//     <>
//       <Appbar />
//       <div className="cart">
//         <div className="container">
//           <h1 className="text-center my-4">Shopping Cart</h1>
//           <div className="row">
//             <div className="col-md-7">
//               <div className="card">
//                 <div className="card-body">
//                   <h2>Your Cart</h2>
//                   <ul className="list-group">
//                     {cart.map((item) => (
//                       <li key={item.id} className="list-group-item">
//                         <div className="d-flex justify-content-between">
//                           <span>{item.name}</span>
//                           <span>${item.price}</span>
//                           <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                   <p>Total: ${total}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card">
//                 <div className="card-body">
//                   <h2>Products</h2>
//                   <ul className="list-group">
//                     {products.map((product) => (
//                       <li key={product.id} className="list-group-item">
//                         <div className="d-flex justify-content-between">
//                           <span>{product.name}</span>
//                           <span>${product.price}</span>
//                           <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Elements stripe={stripePromise}>
//             <CheckoutForm total={total} />
//           </Elements>
//         </div>
//       </div>
//     </>
//   );
// }



import React, { useState, useEffect } from "react";
import { Input, Button, Select , SelectItem} from "@nextui-org/react";
import CountryStateSelector from "../components/CountryStateSelector";


function CheckoutForm() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      address: "",
      creditCard: "",
      selectedCountry: "",
      selectedState: "",
    });
  
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
  
    useEffect(() => {
      fetch("https://www.universal-tutorial.com/api/countries/", {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJqYW5kcm9jb2Rlc0BnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJNb2t0dUJ0Y2JRdzMtSEdlaks0Tkt1d0xCOG5rUzluZmdoNmdPVnhfc0hkWG5DLU02VUVzSkNVck9lclBHbjA1YU1RIn0sImV4cCI6MTY5ODE5MzA3M30.YQbhhVkyNjj33F3wyTwvjWWV9OOaz3jpxMIXWZ4y66k",
          "Accept": "application/json"
        },
      })
        .then((response) => response.json())
        .then((data) => setCountries(data));
    }, []);


    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted with data:", formData);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleCountryChange = (selectedCountry) => {
      setSelectedCountry(selectedCountry);
    };
  
    const handleStateChange = (selectedState) => {
      setSelectedState(selectedState);
    };
    const formStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "500px",
      margin: "0 auto",
    };
  
    const inputStyle = {
      marginBottom: "10px",
    };
  

  return (
    <>
    
    <form onSubmit={handleFormSubmit} style={formStyle}>

      <h2>Customer Info</h2>
      <Input
        id="First Name"
        name="First Name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="First Name"
        required
        style={inputStyle}
      />
      <Input
        id="Last Name"
        name="Last Name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Last Name"
        required
        style={inputStyle}
      />

      <Input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
        style={inputStyle}
      />
      <Select
        id="Country"
        name="Country"
        label="Country"
        className="max-w-xs"
        value={selectedCountry}
      >
        {countries.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.country_name}
          </SelectItem>
        ))}
        </Select>
      <Input
        id="Town/City"
        name="Town/City"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Town/City"
        required
        style={inputStyle}
      />
      <Input
        id="Country"
        name="Country"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Country"
        required
        style={inputStyle}
      />
      <Input
        id="Zip"
        name="Zip"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Zip Code"
        required
        style={inputStyle}
      />
      <h1>Payment Info</h1>
      <Input
        id="creditCard"
        name="creditCard"
        value={formData.creditCard}
        onChange={handleInputChange}
        placeholder="Credit Card"
        required
        style={inputStyle}
      />      
      <Input
        id="Billing/zip"
        name="Billing/Zip"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Billing/Zip"
        required
        style={inputStyle}
      />
      <Input
        id="Month"
        name="Month"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Month"
        required
        style={inputStyle}
      />      
      <Input
        id="Year"
        name="Year"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Year"
        required
        style={inputStyle}
      />
      <Input
        id="CVC"
        name="CVC"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="CVC"
        required
        style={inputStyle}
      />
      <h1>Billing Address</h1>
      <Input
        id="Billing Name"
        name="Billing Name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Billing Name"
        required
        style={inputStyle}
      />
      <Select
        id="Country"
        name="Country"
        className="max-w-xs"
        placeholder="Country"
        value={selectedCountry}
      >
        {countries.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.country_name}
          </SelectItem>
        ))}
        </Select>
      <Input
        id="address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
        required
        style={inputStyle}
      />
      <Input
        id="City"
        name="City"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="City"
        required
        style={inputStyle}
      />
      <Input
        id="Country/State/Provinance"
        name="Country/State/Provinance"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Country/State/Provinance"
        required
        style={inputStyle}
      />
      <Input
        id="Zip"
        name="Zip"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Zip"
        required
        style={inputStyle}
      />
   {/* <Select
        id="State"
        name="State"
        value={selectedState}
        onChange={handleStateChange}
        options={states.map((state) => ({
          label: state.state_name,
          value: state.state_code,
        }))}
        required
        style={inputStyle}
      /> */}

      <Button type="submit">Complete Checkout And Pay :)</Button>
    </form>


    <h1>Current Cart</h1>
    <a href='/'className="return">Return To Cart?</a>
    <Input
    id="shipping"
    name="shipping"
    placeholder="shipping"
    />
    <h4>Total</h4>
    </>
  );
}

export default CheckoutForm;





      {/* <h2>Customer Info</h2>
      <Input
        id="First Name"
        name="First Name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="First Name"
        required
        style={inputStyle}
      />
      <Input
        id="First Name"
        name="Last Name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Last Name"
        required
        style={inputStyle}
      />

      <Input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
        style={inputStyle}
      />
      <Input
        id="selectCountry"
        name="selectCountry"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Select Country"
        required
        style={inputStyle}
      />
      <Input
        id="Town/City"
        name="Town/City"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Town/City"
        required
        style={inputStyle}
      />
      <Input
        id="Country"
        name="Country"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Country"
        required
        style={inputStyle}
      />
      <Input
        id="Zip"
        name="Zip"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Zip Code"
        required
        style={inputStyle}
      />
      <h1>Payment Info</h1>
      <Input
        id="creditCard"
        name="creditCard"
        value={formData.creditCard}
        onChange={handleInputChange}
        placeholder="Credit Card"
        required
        style={inputStyle}
      />      
      <Input
        id="Billing/zip"
        name="Billing/Zip"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Billing/Zip"
        required
        style={inputStyle}
      />
      <Input
        id="Month"
        name="Month"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Month"
        required
        style={inputStyle}
      />      
      <Input
        id="Year"
        name="Year"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Year"
        required
        style={inputStyle}
      />
      <Input
        id="CVC"
        name="CVC"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="CVC"
        required
        style={inputStyle}
      />
      <h1>Billing Address</h1>
      <Input
        id="Billing Name"
        name="Billing Name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Billing Name"
        required
        style={inputStyle}
      />
      <Input
        id="Country"
        name="Country"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Country"
        required
        style={inputStyle}
      />
      <Input
        id="address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
        required
        style={inputStyle}
      />
      <Input
        id="City"
        name="City"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="City"
        required
        style={inputStyle}
      />
      <Input
        id="Country/State/Provinance"
        name="Country/State/Provinance"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Country/State/Provinance"
        required
        style={inputStyle}
      />
      <Input
        id="Zip"
        name="Zip"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Zip"
        required
        style={inputStyle}
      />


      <Button type="submit">Complete Checkout And Pay :)</Button> */}