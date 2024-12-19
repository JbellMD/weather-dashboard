import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ coord }) => {
    if (!coord) return null;

    return (
        <MapContainer
            center={[coord.lat, coord.lon]}
            zoom={10}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[coord.lat, coord.lon]}>
                <Popup>Weather Location</Popup>
            </Marker>
        </MapContainer>
    );
};

export default WeatherMap;
