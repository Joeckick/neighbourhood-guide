import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet'; // Import Leaflet library for custom icon

// Fix for default marker icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to update map center and zoom when props change
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function MapDisplay({ latitude, longitude }) {
  const position = [latitude, longitude];
  const zoomLevel = 14;

  // Handle case where coordinates are not yet available
  if (latitude === null || longitude === null) {
    return <div>Loading map...</div>; // Or return null, or a placeholder
  }

  return (
    <MapContainer 
      center={position} 
      zoom={zoomLevel} 
      scrollWheelZoom={false} // Adjust as needed
      style={{ height: '400px', width: '100%' }} // Define map size
    >
      <ChangeView center={position} zoom={zoomLevel} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}></Marker>
    </MapContainer>
  );
}

export default MapDisplay; 