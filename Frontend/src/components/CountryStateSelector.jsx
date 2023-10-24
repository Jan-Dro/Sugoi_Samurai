import React, { useState, useEffect } from "react";
import { Select } from "@nextui-org/react";

function CountryStateSelector() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    fetch("https://www.universal-tutorial.com/api/countries/")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    setSelectedCountry(selectedCountryCode);
    fetchStates(selectedCountryCode);
  };

  const fetchStates = (countryCode) => {
    const apiUrl = `https://www.universal-tutorial.com/api/states/${selectedCountry}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  };

  return (
    <div>
      <Select
        id="country"
        name="country"
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder="Select Country"
      >
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </Select>

      <Select
        id="state"
        name="state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        placeholder="Select State"
      >
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default CountryStateSelector;