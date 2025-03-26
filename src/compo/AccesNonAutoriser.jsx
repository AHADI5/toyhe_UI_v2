import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccesNonAutoriser = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center w-full h-full p-4 bg-gradient-to-br from-red-50 to-blue-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 mx-4 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="flex flex-col items-center">
          <img 
            src="/assets/logos/TOYHE_LOGO_250x250.png" 
            alt="Toyhe Logo" 
            className="object-contain w-40 h-40 mb-6"
            style={{ maxWidth: '100%' }}
          />
          
          <div className="mb-6 text-red-500 text-7xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
            Accès Non Autorisé
          </h1>
          
          <p className="mb-8 text-center text-gray-600">
            Désolé, vous n'avez pas les droits nécessaires pour accéder à cette page.
            Veuillez contacter votre administrateur si vous pensez qu'il s'agit d'une erreur.
          </p>
          
          <div className="flex flex-col w-full gap-4 sm:flex-row">
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 text-white transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105"
            >
              Retour à l'accueil
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 text-gray-700 transition-colors duration-300 transform bg-gray-100 rounded-lg hover:bg-gray-200 hover:scale-105"
            >
              Page précédente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccesNonAutoriser;