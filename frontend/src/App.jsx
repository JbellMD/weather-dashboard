import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navigation from './components/Navigation';
import WeatherCard from './components/WeatherCard';
import HourlyForecast from './components/HourlyForecast';
import WeatherMap from './components/WeatherMap';

function App() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const defaultCity = "New York";

    const fetchWeather = async (city) => {
        const apiKey = 'acb9767d21b6e05d7c8f30cc8261ce19';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            console.log('Weather data:', data); // Debug log
            setWeather(data);
            setError('');
        } catch (err) {
            console.error('Error fetching weather:', err); // Debug log
            setWeather(null);
            setError(err.message);
        }
    };

    const handleSearch = (city) => {
        fetchWeather(city || defaultCity);
    };

    useEffect(() => {
        fetchWeather(defaultCity);
    }, []);

    return (
        <div className="App">
            <Navigation />
            <main className="main-content">
                <div className="search-section">
                    <h1>WeatherHub Dashboard</h1>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Enter city"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch(e.target.value);
                                }
                            }}
                        />
                        <button onClick={() => {
                            const input = document.querySelector('.search-container input');
                            handleSearch(input.value);
                        }}>
                            <FontAwesomeIcon icon={faSearch} /> Search
                        </button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
                
                <div className="weather-container">
                    {weather && (
                        <>
                            <WeatherCard weather={weather} />
                            <HourlyForecast city={weather.name} />
                        </>
                    )}
                </div>
                
                {weather && weather.coord && (
                    <WeatherMap coord={weather.coord} />
                )}
            </main>
        </div>
    );
}

export default App;
