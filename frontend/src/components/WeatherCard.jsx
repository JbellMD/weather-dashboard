import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faThermometerHalf, 
    faTint, 
    faWind,
    faCloud,
    faCloudRain,
    faSnowflake,
    faSun,
    faMoon,
    faCloudSun,
    faBolt,
    faSmog,
    faQuestion
} from '@fortawesome/free-solid-svg-icons';
import { celsiusToFahrenheit, getWeatherIcon } from '../utils/weatherUtils';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    const weatherIcon = getWeatherIcon(weather.weather[0].description);
    const iconMap = {
        'sun': faSun,
        'moon': faMoon,
        'cloud': faCloud,
        'cloud-sun': faCloudSun,
        'cloud-rain': faCloudRain,
        'snowflake': faSnowflake,
        'bolt': faBolt,
        'smog': faSmog,
        'question': faQuestion
    };

    return (
        <div className="weather-info">
            <div className="weather-header">
                <h2>{weather.name}</h2>
                <div className="weather-icon">
                    <FontAwesomeIcon 
                        icon={iconMap[weatherIcon]} 
                        size="2x" 
                    />
                </div>
            </div>
            
            <div className="weather-details">
                <div className="weather-temp">
                    <FontAwesomeIcon icon={faThermometerHalf} />
                    <div className="temp-values">
                        <span className="temp-main">{celsiusToFahrenheit(weather.main.temp)}°F</span>
                        <span className="temp-celsius">({weather.main.temp.toFixed(1)}°C)</span>
                    </div>
                </div>

                <div className="weather-condition">
                    {weather.weather[0].description.charAt(0).toUpperCase() + 
                     weather.weather[0].description.slice(1)}
                </div>

                <div className="weather-stats">
                    <div className="stat-item">
                        <FontAwesomeIcon icon={faTint} />
                        <span>{weather.main.humidity}% Humidity</span>
                    </div>
                    <div className="stat-item">
                        <FontAwesomeIcon icon={faWind} />
                        <span>{(weather.wind.speed * 2.237).toFixed(1)} mph</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
