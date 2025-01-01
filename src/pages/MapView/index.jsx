import React from 'react';
import MapComponent from '../../components/MapComponent';
import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const MapView = () => {
  const position = [31.04, 75.41]; // punjab coordinates
  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
      <div style={{ height: "100vh", width: "100%" }}>
        <MapComponent />
      </div>
    </MapContainer>
  );
};

export default MapView;
