import React from 'react';

export default function CompanyForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="nationalId"
            placeholder="Numéro d'identification nationale"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
        </div>
        <div>
          <input
            type="text"
            name="rccm"
            placeholder="Numéro RCCM"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
        </div>
        <div>
          <input
            type="text"
            name="taxNumber"
            placeholder="Numéro d'impôt ressort"
            className="w-full h-12 px-4 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
          />
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