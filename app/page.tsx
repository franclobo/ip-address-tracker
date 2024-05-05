'use client';
import React, { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { fetchGeo } from '@/lib/features/geoSlice';
import Formulario from './_components/Formulario';
import Resultados from './_components/Resultados';

import dynamic from 'next/dynamic';

const MapaComponent = dynamic(() => import('./_components/Mapa'), { ssr: false });


const Home: React.FC = () => {
  const [coordinates, setCoordinates] = useState({ lat: 34.04915, lng: -118.09462 });
  const dispatch = useAppDispatch();

  const handleSubmit = (inputValue: string) => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&ipAddress=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        const { lat, lng } = data.location;
        setCoordinates({ lat, lng });
        // Dispatch action to update geo data in Redux store
        dispatch(fetchGeo(inputValue));
      })
      .catch(error => console.error('Error fetching geo data:', error));
  };

  return (
    <main className="flex flex-col items-center justify-between">
      <header className="flex flex-col items-center justify-center gap-4 w-full pt-10 px-10 pb-32">
        <h1 className="font-bold text-white text-xl">IP Address Tracker</h1>
        <Formulario onSubmit={handleSubmit} />
      </header>
      <section className="relative flex items-center justify-center w-full">
        <Resultados />
      </section>
      <MapaComponent lat={coordinates.lat} lng={coordinates.lng} />
    </main>
  );
};

export default Home;
