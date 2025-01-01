import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ImageOverlay } from 'react-leaflet';
import L, { latLng, rectangle } from 'leaflet';
import 'leaflet-draw';
import mapService from '../../api/map';

const DrawControl = ({ setImageURL, setLoading, setBounds }) => {
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
        rectangle: {
          allowIntersection: false,
          drawError: {
            color: '#fff',
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
        polygon: false,
        marker: false,
        circlemarker: false
      },
      edit: {
        featureGroup: featureGroup, 
        remove: true, 
      }
    };

    const drawControl = new L.Control.Draw(drawPluginOptions);
    map.addControl(drawControl); 

    map.on('draw:created', async (event) => {
      setLoading(true);
      const layer = event.layer;
      featureGroup.addLayer(layer); 
      const bounds = layer.getBounds();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      const coordinates = `${southWest.lng},${southWest.lat},${northEast.lng},${northEast.lat}`;
      // const coordinates = [southWest.lng, southWest.lat, northEast.lng, northEast.lat];
      console.log('Created layer:', layer.getLatLngs(), coordinates, layer.getBounds(), coordinates);
      const response = await mapService.getMapData({
      // const response = await mapService.fetchSatelliteData({
        coordinates: coordinates,
        startDate: '2021-11-01',
        endDate: '2021-11-02',
        layer: 'NDVI',
        crs: 'WGS84',
        resolution: 150,
        saveData: true
      })
      if (!response.image) {
        console.log('No image found');
        setLoading(false);
        return;
      }
      const imageURL = `data:image/jpeg;base64,${response.image}`;
      setBounds(layer.getLatLngs()[0].map(latLng => [latLng.lat, latLng.lng]));
      setImageURL(imageURL);
    });

    return () => {
      map.removeControl(drawControl); 
      map.removeLayer(featureGroup); 
    };

  }, [map]); 

  return null;
};




const MapComponent = () => {
  const position = [31.04, 75.41]; 
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bounds, setBounds] = useState([]);
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
      {imageURL && bounds && <ImageOverlay url={imageURL} bounds={bounds}/>}
      <DrawControl setImageURL={setImageURL} setLoading={setLoading} setBounds={setBounds}/>
    </>
  );
};

export default MapComponent;
