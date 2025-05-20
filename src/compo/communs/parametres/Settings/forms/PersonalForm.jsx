import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '../../utils/countries';
import { validateAge } from '../../utils/validation';

export default function PersonalForm({ onSubmit }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [errors, setErrors] = useState({
    birthDate: '',
  });

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const birthDate = formData.get('birthDate');

    if (!validateAge(birthDate)) {
      setErrors(prev => ({
        ...prev,
        birthDate: 'Vous devez avoir au moins 18 ans',
      }));
      return;
    }

    onSubmit(Object.fromEntries(formData));
  };

  const handleDateChange = (e) => {
    const birthDate = e.target.value;
    if (!validateAge(birthDate)) {
      setErrors(prev => ({
        ...prev,
        birthDate: 'Vous devez avoir au moins 18 ans',
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        birthDate: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="birthPlace"
            placeholder="Lieu de naissance"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
        </div>
        <div>
          <input
            type="date"
            name="birthDate"
            onChange={handleDateChange}
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-[#e93e3a]">{errors.birthDate}</p>
          )}
        </div>
        <div>
          <div className="relative">
            <select
              name="nationality"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors appearance-none"
            >
              <option value="">Sélectionnez votre nationalité</option>
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