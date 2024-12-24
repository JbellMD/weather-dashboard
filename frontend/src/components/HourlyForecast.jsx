import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
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

const HourlyForecast = ({ city }) => {
    const [hourlyData, setHourlyData] = useState([]);
    const [error, setError] = useState('');

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

    const fetchHourlyForecast = useCallback(async () => {
        if (!city) return;

        const apiKey = 'acb9767d21b6e05d7c8f30cc8261ce19';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Unable to fetch hourly forecast');
            const data = await response.json();
            setHourlyData(data.list.slice(0, 8));
            setError('');
        } catch (err) {
            setError(err.message);
            setHourlyData([]);
        }
    }, [city]);

    useEffect(() => {
        fetchHourlyForecast();
    }, [fetchHourlyForecast]);

    return (
        <div className="forecast-container">
            <div className="forecast-header">
                <h3>Hourly Forecast</h3>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="hourly-forecast">
                {hourlyData.map((hour, index) => {
                    const weatherIcon = getWeatherIcon(hour.weather[0].description);
                    const tempF = celsiusToFahrenheit(hour.main.temp);
                    return (
                        <div key={index} className="hour">
                            <div className="hour-time">
                                {new Date(hour.dt_txt).toLocaleTimeString([], { 
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </div>
                            <div className="hour-icon">
                                <FontAwesomeIcon 
                                    icon={iconMap[weatherIcon]} 
                                    size="lg"
                                />
                            </div>
                            <div className="hour-temp">
                                <span className="temp-f">{tempF}°F</span>
                                <span className="temp-c">({hour.main.temp.toFixed(1)}°C)</span>
                            </div>
                            <div className="hour-condition">
                                {hour.weather[0].description.charAt(0).toUpperCase() + 
                                 hour.weather[0].description.slice(1)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecast;
