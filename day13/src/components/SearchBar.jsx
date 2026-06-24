import React from "react";

function SearchBar({ city, setCity, fetchWeather }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;