'use client';
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import {
  selectIp,
  selectCity,
  selectCountry,
  selectRegion,
  selectPostalCode,
  selectTimezone,
  selectIsp,
} from '@/lib/features/geoSlice';

const Resultados: React.FC = () => {
  const ipAddress = useAppSelector(selectIp);
  const city = useAppSelector(selectCity);
  const country = useAppSelector(selectCountry);
  const region = useAppSelector(selectRegion);
  const postalCode = useAppSelector(selectPostalCode);
  const timezone = useAppSelector(selectTimezone);
  const isp = useAppSelector(selectIsp);

  return (
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
  );
};

export default Resultados;
