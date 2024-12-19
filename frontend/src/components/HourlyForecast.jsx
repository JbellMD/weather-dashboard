import React, { useState, useEffect, useCallback } from 'react';

const HourlyForecast = ({ city }) => {
    const [hourlyData, setHourlyData] = useState([]);
    const [error, setError] = useState('');

    const fetchHourlyForecast = useCallback(async () => {
        if (!city) return;

        const apiKey = 'acb9767d21b6e05d7c8f30cc8261ce19';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Unable to fetch hourly forecast');
            const data = await response.json();
            setHourlyData(data.list.slice(0, 8)); // Get the next 24 hours (3-hour intervals)
            setError('');
        } catch (err) {
            setError(err.message);
            setHourlyData([]);
        }
    }, [city]); // Memoize the function based on the `city` dependency

    useEffect(() => {
        fetchHourlyForecast();
    }, [fetchHourlyForecast]); // Use the memoized function as a dependency

    return (
        <div>
            <h3>Hourly Forecast</h3>
            {error && <p className="error">{error}</p>}
            <div className="hourly-forecast">
                {hourlyData.map((hour, index) => (
                    <div key={index} className="hour">
                        <p>{new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>{hour.main.temp}°C</p>
                        <p>{hour.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;
