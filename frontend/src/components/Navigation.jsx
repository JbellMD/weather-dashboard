import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCloud,
    faChartLine,
    faMap,
    faCog,
    faClock
} from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const currentTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <nav className="navigation">
            <div className="nav-left">
                <FontAwesomeIcon icon={faCloud} className="nav-icon" />
                <h2>WeatherHub</h2>
            </div>
            <div className="nav-center">
                <ul className="nav-links">
                    <li className="active">
                        <FontAwesomeIcon icon={faChartLine} />
                        <span>Dashboard</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCloud} />
                        <span>Forecast</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faMap} />
                        <span>Maps</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCog} />
                        <span>Settings</span>
                    </li>
                </ul>
            </div>
            <div className="nav-right">
                <div className="time">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{currentTime}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
