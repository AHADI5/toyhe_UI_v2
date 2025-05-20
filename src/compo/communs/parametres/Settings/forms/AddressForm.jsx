import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '../../utils/countries';

export default function AddressForm({ onSubmit }) {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="street"
            placeholder="Nº et adresse"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
        </div>
        <div>
          <input
            type="text"
            name="district"
            placeholder="Quartier"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
        </div>
        <div>
          <input
            type="text"
            name="commune"
            placeholder="Commune"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Ville ou territoire"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
        </div>
        <div>
          <input
            type="text"
            name="province"
            placeholder="Province"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
        </div>
        <div className="relative">
          <select
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors appearance-none"
          >
            <option value="">Sélectionnez votre pays</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            {selectedCountry && (
              <ReactCountryFlag
                countryCode={selectedCountry}
                svg
                className="w-5 h-5"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#1c75bc] text-white px-6 py-3 rounded-lg hover:bg-[#2b3990] transition-colors"
        >
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
}