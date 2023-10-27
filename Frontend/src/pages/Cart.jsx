
import React, { useState, useEffect, useEffectHook } from "react";
import { Input, Button, Select , SelectItem} from "@nextui-org/react";
import CountryStateSelector from "../components/CountryStateSelector";
import { useLocation } from "react-router-dom";
import Appbar from '../NavBar'

function CheckoutForm({cartItems}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    creditCard: "",
    selectedCountry: "",
    selectedState: "",
  });

  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const location = useLocation()
  const totalPrice = location.searchParams && location.searchParams.get("newTotal");

 useEffect(() => {
  const base_url = import.meta.env.VITE_BASE_URL
  const fetchCountries = async ()=> {
    const response = await fetch(`http://${base_url}/users/api/get_countries/`, { 
    });
    const data = await response.json();
      setCountries(data);
    }
      fetchCountries()
    }, []);

    async function fetchStatesByCountry(country) {
      const base_url = import.meta.env.VITE_BASE_URL
      if (country) {
        const response = await fetch(`http://${base_url}/users/api/get_states/${country}/`, {
        });
        const data = await response.json();
          setStates(data);
        }}

      
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
        
      
const handleCountryChange = (event) => {
  const selectedCountry = event.target.value;
  setFormData({
    ...formData,
    selectedCountry,
    selectedState: "",
  });
        
  fetchStatesByCountry(selectedCountry);
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
  <Appbar />
  <form onSubmit={handleFormSubmit} style={formStyle}>
    <div className="checkout-card">
      <section>
    <h2>Customer Info</h2>
    <Input
      className="input"
      id="First Name"
      name="First Name"
      value={formData.firstName}
      onChange={handleInputChange}
      placeholder="First Name"
      required
      style={inputStyle}
    />
    <Input
      className="input"
      id="Last Name"
      name="Last Name"
      value={formData.lastName}
      onChange={handleInputChange}
      placeholder="Last Name"
      required
      style={inputStyle}
    />
    <Input
      className="input"
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      placeholder="Email"
      required
      style={inputStyle}
    />
    
      <select
        className="input"
        name="selectedCountry"
        required
        onChange={handleCountryChange}
        value={formData.selectedCountry}
      >
      <option value="" disabled>Select a Country</option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.iso2}>
            {country.name}
            </option>
            ))}
       </select>
       <select
          className="input"
          name="selectedState"
          required
          onChange={handleInputChange}
          value={formData.selectedState}
        >
        <option value="" disabled>Select a State</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
          {state.name}
        </option>
          ))}
        </select>
      <Input
      className="input"
      id="Town/City"
      name="Town/City"
      value={formData.city}
      onChange={handleInputChange}
      placeholder="Town/City"
      required
      style={inputStyle}
    />
          <Input
            className="input"
            id="Country"
            name="Country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="Zip"
            name="Zip"
            value={formData.zip}
            onChange={handleInputChange}
            placeholder="Zip Code"
            required
            style={inputStyle}
          />
          </section>
          <section>
          <h1>Payment Info</h1>
          <Input
            className="input"
            id="creditCard"
            name="creditCard"
            value={formData.creditCard}
            onChange={handleInputChange}
            placeholder="Credit Card"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="Billing/zip"
            name="Billing/Zip"
            value={formData.zip}
            onChange={handleInputChange}
            placeholder="Billing/Zip"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="Month"
            name="Month"
            value={formData.month}
            onChange={handleInputChange}
            placeholder="Month"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="Year"
            name="Year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="Year"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="CVC"
            name="CVC"
            value={formData.cvc}
            onChange={handleInputChange}
            placeholder="CVC"
            required
            style={inputStyle}
          />
          </section>
          <section>
          <h1>Billing Address</h1>
          <Input
            className="input"
            id="Billing Name"
            name="Billing Name"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Billing Name"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="City"
            name="City"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="Country/State/Provinance"
            name="Country/State/Provinance"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Country/State/Provinance"
            required
            style={inputStyle}
          />
          <Input
            className="input"
            id="Zip"
            name="Zip"
            value={formData.zip}
            onChange={handleInputChange}
            placeholder="Zip"
            required
            style={inputStyle}
          />
        </section>
        <section className="buttons">
          <p>Total: ${totalPrice}</p>
          <Button type="submit">Complete Checkout And Pay :)</Button>
          <Button type="return" className="return" >Return for more?</Button>
        </section>
      </div> 
    </form>
    
    </>
    );
}
export default CheckoutForm;