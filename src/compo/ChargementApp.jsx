import React, { useState, useEffect } from 'react';

const ChargementApp = () => {
  const [loadingProgress, setLoadingProgress] = useState(50);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center w-full h-full bg-[#f5f5ff] from-blue-50 to-blue-100">
      <div className="w-full max-w-md px-4">
        <div className={`transform transition-transform duration-1000 hover:scale-105 mb-8 ${
          loadingProgress === 100 ? 'animate-bounce' : ''
        }`}>
          <img 
            src="/assets/logos/TOYHE_LOGO_250x250.png"
            alt="Toyhe Logo" 
            className="object-contain w-64 h-64 mx-auto"
            style={{ maxWidth: '100%' }}
          />
        </div>
        
        <div className="w-full h-4 mb-4 overflow-hidden bg-white rounded-full shadow-lg">
          <div 
            className="h-full transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 to-blue-400"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-blue-900">
            Chargement en cours...
          </h2>
          <p className="text-blue-700 animate-pulse">
            {loadingProgress}% complété
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChargementApp;