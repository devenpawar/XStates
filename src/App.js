import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelectedCountry = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      )
      .then((response) => {
        console.log(response.data);
        setStates(response.data);
        console.log(states);
      })
      .catch((error) => console.log(error));
  };

  const handleSelectedState = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
      )
      .then((response) => {
        console.log(response.data);
        setCities(response.data);
      })
      .catch((error) => console.log(error));
  };
  const handleSelectedCity = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  return (
    <div className="App">
      <div
        className="x-states-box"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
          columnGap: "10px",
          rowGap: "10px",
        }}
      >
        <div className="country-select-box">
          <select
            value={selectedCountry}
            onChange={handleSelectedCountry}
            name="select-country"
            style={{ padding: "0.8rem" }}
          >
            <option>Select Country</option>
            {countries.map((country) => {
              return (
                <option key={country.length + Math.random()} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
        </div>
        <div className="state-select-box">
          <select
            onChange={handleSelectedState}
            value={selectedState}
            style={{ padding: "0.8rem" }}
            disabled={!selectedCountry}
          >
            <option>Select State</option>
            {states.map((state) => {
              return (
                <option key={state.length + Math.random()} value={state}>
                  {state}
                </option>
              );
            })}
          </select>
        </div>
        <div className="city-select-box">
          <select
            value={selectedCity}
            onChange={handleSelectedCity}
            style={{ padding: "0.8rem" }}
            disabled={!selectedState}
          >
            <option>Select City</option>
            {cities.map((city) => {
              return (
                <option key={city.length + Math.random()} value={city}>
                  {city}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {selectedCity && (
        <div>
          <span style={{ fontWeight: "bold" }}>
            You selected{" "}
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {selectedCity}
            </span>{" "}
            <span style={{ color: "grey" }}>
              {selectedState}, {selectedCountry}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
