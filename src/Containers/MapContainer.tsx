import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Penguin {
  penguinName: string;
  lastPosition: [number, number];
  lastUpdate: string;
  ageAtTagging: string;
  taggedBy: string;
}

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [penguins, setPenguins] = useState<Penguin[]>([]);

  useEffect(() => {
    if (!map && !document.querySelector('.leaflet-container')) {
      const newMap = L.map('map').setView([-77.84068826234282, 166.68787351282026], 10);

      newMap.createPane('cardPane');
      const cardPane = newMap.getPane('cardPane');
      if (cardPane) {
        cardPane.style.zIndex = '650';
      }
      L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
        //attribution: 'iles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
        maxZoom: 6,
        minZoom: 5,
      }).addTo(newMap);

      setMap(newMap);
    }
  }, [map]);

  useEffect(() => {
    fetch('https://penguintrackerapi.fly.dev/admin/penguins')
      .then(response => response.json())
      .then(data => setPenguins(data));
  }, []);

  useEffect(() => {
    if (map) {
      const penguinIcon = L.icon({
        iconUrl: 'src/assets/pengsvg.svg',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -30]
      });

      penguins.forEach(penguin => {
        L.marker(penguin.lastPosition, {icon: penguinIcon})
          .bindPopup(`
            <h2>Name: ${penguin.penguinName}</h2>
            <p>Last Position: ${penguin.lastPosition[0]}, ${penguin.lastPosition[1]}</p>
            <p>Last Updated: ${new Date(penguin.lastUpdate).toLocaleString()}</p>
            <p>Age at Tagging: ${penguin.ageAtTagging}</p>
            <p>Tagged by: ${penguin.taggedBy}</p>
          `)
          .addTo(map);
        L.circleMarker(penguin.lastPosition, {
          radius: 10,
          fillColor: "#bebefa",
          weight: 0.1,
          opacity: 1,
          fillOpacity: 1,
          className: 'blinking-circle'
        }).addTo(map);
      });
    }
  }, [map, penguins]);

  return (
    <div id="map-container" style={{ position: 'relative' }}>
      <div id="map"></div>
    </div>
  );  
};

export default MapComponent;