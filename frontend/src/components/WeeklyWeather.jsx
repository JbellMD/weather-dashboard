import React, { useState, useEffect, useCallback } from 'react';

const WeeklyWeather = ({ lat, lon }) => {
    const [weeklyData, setWeeklyData] = useState([]);
    const [error, setError] = useState('');

    // Memoize the fetch function
    const fetchWeeklyForecast = useCallback(async () => {
        if (!lat || !lon) return;

        const apiKey = 'acb9767d21b6e05d7c8f30cc8261ce19';
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Unable to fetch weekly forecast');
            const data = await response.json();
            setWeeklyData(data.daily); // Use "daily" from the One Call API
            setError('');
        } catch (err) {
            setError(err.message);
            setWeeklyData([]);
        }
    }, [lat, lon]); // Depend on lat and lon

    useEffect(() => {
        fetchWeeklyForecast();
    }, [fetchWeeklyForecast]); // Depend on the memoized function

    return (
        <div>
            <h3>Weekly Forecast</h3>
            {error && <p className="error">{error}</p>}
            {weeklyData.length === 0 ? (
                <p>Loading weekly data...</p>
            ) : (
                <div className="weekly-forecast">
                    {weeklyData.map((day, index) => (
                        <div key={index} className="day">
                            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                            <p>Temp: {day.temp.day}°C</p>
                            <p>{day.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeeklyWeather;

