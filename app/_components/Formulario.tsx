// _components/Formulario.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Arrow from '../../public/images/icon-arrow.svg';

interface FormularioProps {
  onSubmit: (inputValue: string) => void;
}

const Formulario: React.FC<FormularioProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form className="grid grid-cols-10 justify-center" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for any IP address or domain"
        className="p-2 rounded-bl-lg rounded-tl-lg col-span-9"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className="flex items-center justify-center p-3 rounded-br-lg rounded-tr-lg bg-black text-white col-span-1"
        type="submit"
      >
        <Image src={Arrow} alt="Arrow" className="white-arrow-svg" />
      </button>
    </form>
  );
};

export default Formulario;
