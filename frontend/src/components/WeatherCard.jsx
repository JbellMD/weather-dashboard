import React from 'react';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    return (
        <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
    );
};

export default WeatherCard;
