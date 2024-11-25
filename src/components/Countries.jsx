import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { MultiSelect } from "primereact/multiselect";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

export default function Countries(props) {
  const [data, setData] = useState([]); // Country list data

  const countryApi =
    "https://api.worldbank.org/v2/country?format=json&region=EUU"; // API URL for countries

  // Fetch country names and codes from the API
  useEffect(() => {
    fetch(countryApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
          const countryArray = data[1];
          const countryNames = countryArray.map((country) => ({
            name: country.name,
            code: country.iso2Code, // Get country code 
          }));
          setData(countryNames); // Set the data with name and code
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  // Handle selected countries update from MultiSelect
  const handleCountryChange = (e) => {
    // Set the selected countries with both name and code
    props.setSelectedCountries(e.value);
  };

  return (
    <div className="country--list">
      <h3>List of Countries:</h3>
      <MultiSelect
        value={props.selectedCountries} // Display selected countries
        options={data.map((country) => ({
          label: country.name, // Country name as the label
          value: country, // Whole country object as the value (name + code)
        }))}
        
        onChange={handleCountryChange} // Update selected countries on change
        placeholder="Select countries"
        display="chip"
        filter // Enable filtering
        filterPlaceholder="Search by country name" // Placeholder for filter input
        filterBy="label" // Specify filter field 
        style={{ width: "20rem" }}
      />
      {props.selectedCountries.length > 0 && (
        <div>
          <h4>Selected Countries:</h4>
          <ul>
            {props.selectedCountries.map((country, index) => (
              <li key={index}>{country.name}</li> // Display the country name
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Countries.propTypes = {
  selectedCountries: PropTypes.array, // Array of selected countries
  setSelectedCountries: PropTypes.func, // Function to update selected countries
};
