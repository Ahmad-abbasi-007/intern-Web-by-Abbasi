import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🌦 Weather App</h1>

      <SearchBar
        city={city}
        setCity={setCity}
        fetchWeather={fetchWeather}
      />

      {loading && <Loader />}

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;