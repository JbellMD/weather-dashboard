export const celsiusToFahrenheit = (celsius) => {
    return ((celsius * 9/5) + 32).toFixed(1);
};

export const getWeatherIcon = (condition) => {
    const timeOfDay = new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'day' : 'night';
    condition = condition.toLowerCase();
    
    if (condition.includes('clear')) return timeOfDay === 'day' ? 'sun' : 'moon';
    if (condition.includes('cloud')) {
        if (condition.includes('scattered')) return 'cloud-sun';
        if (condition.includes('broken')) return 'cloud';
        if (condition.includes('few')) return 'cloud-sun';
        return 'clouds';
    }
    if (condition.includes('rain')) return 'cloud-rain';
    if (condition.includes('snow')) return 'snowflake';
    if (condition.includes('thunder')) return 'bolt';
    if (condition.includes('mist') || condition.includes('fog')) return 'smog';
    return 'question';
};

export const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};
