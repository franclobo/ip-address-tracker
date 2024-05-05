// _components/Mapa.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapaProps {
  lat: number;
  lng: number;
}

const Mapa: React.FC<MapaProps> = ({ lat, lng }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && mapRef.current == null) {
      const map = L.map('map').setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      mapRef.current = map;

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, [lat, lng]);

  return <div id="map" style={{ width: '100%', height: '400px', zIndex: '-10' }}></div>;
};

export default Mapa;
