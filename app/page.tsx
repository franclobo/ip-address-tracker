'use client';
import { useRef, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import {
  fetchGeo,
  selectIp,
  selectCountry,
  selectRegion,
  selectCity,
  selectPostalCode,
  selectTimezone,
  selectIsp,
  selectLat,
  selectLng,
} from '@/lib/features/geoSlice';
import Image from 'next/image';
import Arrow from '../public/images/icon-arrow.svg';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  const dispatch = useAppDispatch();
  const ipAddress = useAppSelector(selectIp);
  const city = useAppSelector(selectCity);
  const country = useAppSelector(selectCountry);
  const region = useAppSelector(selectRegion);
  const postalCode = useAppSelector(selectPostalCode);
  const timezone = useAppSelector(selectTimezone);
  const isp = useAppSelector(selectIsp);
  const lat = useAppSelector(selectLat);
  const lng = useAppSelector(selectLng);
  const mapRef = useRef<L.Map | null>(null); // Referencia al mapa de Leaflet
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!mapRef.current) {
      // Si no hay una instancia del mapa, crear una nueva
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      mapRef.current = map; // Asignar la referencia al mapa
    }
    return () => {
      // Destruir el mapa al desmontar el componente
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null; // Limpiar la referencia al mapa
      }
    };
  }, []);

  useEffect(() => {
    // Actualizar el mapa cuando la dirección IP cambie
    if (mapRef.current && ipAddress) {
      fetch(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&ipAddress=${ipAddress}`)
        .then(response => response.json())
        .then(data => {
          const { lat, lng } = data.location;
          mapRef.current!.setView([lat, lng], 13);
        })
        .catch(error => console.error('Error fetching geo data:', error));
    }
  }, [ipAddress]);

  const handleIP = () => {
    dispatch(fetchGeo(inputValue));
    // Actualizar el mapa cuando se haga clic en el botón
    if (typeof window !== 'undefined' && mapRef.current && lat && lng) {
      mapRef.current.setView([lat, lng], 13);
    } else {
      fetch(`https://geo.ipify.org/api/v1?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&ipAddress=${inputValue}`)
        .then(response => response.json())
        .then(data => {
          const { lat, lng } = data.location;
          mapRef.current!.setView([lat, lng], 13);
        })
        .catch(error => console.error('Error fetching geo data:', error));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <main className="flex flex-col items-center justify-between">
      <header className="flex flex-col items-center justify-center gap-4 w-full pt-10 px-10 pb-32">
        <h1 className="font-bold text-white text-xl">IP Address Tracker</h1>
        <form className="grid grid-cols-10 justify-center">
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="p-2 rounded-bl-lg rounded-tl-lg col-span-9"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="flex items-center justify-center p-3 rounded-br-lg rounded-tr-lg bg-black text-white col-span-1"
            type="button"
            onClick={handleIP}
          >
            <Image src={Arrow} alt="Arrow" className="white-arrow-svg" />
          </button>
        </form>
      </header>
      <section className="relative flex items-center justify-center w-full">
        <div className="absolute text-center md:text-left -top-28 md:-top-16 bg-white p-5 rounded-lg flex flex-col items-center justify-center gap-4 md:flex-row">
          <div className="flex flex-col items-center justify-center">
            <h2 className="uppercase text-xs">IP Address</h2>
            <p className="font-bold text-gray-900">{ipAddress}</p>
          </div>
          <div className="hidden md:flex md:bg-gray-300 md:h-20 md:w-0.5"></div>
          <div className="flex flex-col items-center justify-center flex-wrap">
            <h2 className="uppercase text-xs">Location</h2>
            <p className="font-bold text-gray-900 flex-shrink-0">{city} - {country}, {region} {postalCode}</p>
          </div>
          <div className="hidden md:flex md:bg-gray-300 md:h-20 md:w-0.5"></div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="uppercase text-xs">Timezone</h2>
            <p className="font-bold text-gray-900">UTC {timezone}</p>
          </div>
          <div className="hidden md:flex md:bg-gray-300 md:h-20 md:w-0.5"></div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="uppercase text-xs">ISP</h2>
            <p className="font-bold text-gray-900">{isp}</p>
          </div>
        </div>
        <div id="map" style={{ width: '100%', height: '400px', zIndex: '-10' }}></div>
      </section>
    </main>
  );
}
