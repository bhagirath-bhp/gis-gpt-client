import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

const DrawControl = () => {
  const map = useMap(); 
  const featureGroupRef = useRef(null);

  useEffect(() => {
    if (!map) return; 
    const featureGroup = new L.FeatureGroup();
    featureGroupRef.current = featureGroup; 

    map.addLayer(featureGroup);

    const drawPluginOptions = {
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e1e100',
            message: '<strong>Oh snap!</strong> you can\'t draw that!'
          },
          shapeOptions: {
            color: '#97009c'
          },
          showArea: true,
          metric: false,
          repeatMode: true
        },
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false
      },
      edit: {
        featureGroup: featureGroup, 
        remove: true, 
      }
    };

    const drawControl = new L.Control.Draw(drawPluginOptions);
    map.addControl(drawControl); 

    map.on('draw:created', (event) => {
      const layer = event.layer;
      featureGroup.addLayer(layer); 
      console.log('Created layer:', layer);
    });

    return () => {
      map.removeControl(drawControl); 
      map.removeLayer(featureGroup); 
    };

  }, [map]); 

  return null;
};




const MapComponent = () => {
  const position = [51.505, -0.09]; 
  return (
    < >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <DrawControl />
    </>
  );
};

export default MapComponent;
