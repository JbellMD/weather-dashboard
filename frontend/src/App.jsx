import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import WeatherCard from './components/WeatherCard';
import HourlyForecast from './components/HourlyForecast';
import WeatherMap from './components/WeatherMap';

function App() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async (city) => {
        const apiKey = 'acb9767d21b6e05d7c8f30cc8261ce19'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeather(data);
            setError('');
        } catch (err) {
            setWeather(null);
            setError(err.message);
        }
    };

    return (
        <div className="App">
            <h1>Weather Dashboard</h1>
            <Search onSearch={fetchWeather} />
            {error && <p className="error">{error}</p>}
            <div className="weather-container">
                <WeatherCard weather={weather} />
                <HourlyForecast city={weather?.name} />
            </div>
        
            <WeatherMap coord={weather?.coord} />
        </div>
    );
}

export default App;
