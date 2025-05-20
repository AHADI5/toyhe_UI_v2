import React, { useState, useEffect } from 'react';
import SettingsMenu from './SettingsMenu';
import PersonalForm from './forms/PersonalForm';
import CompanyForm from './forms/CompanyForm';
import AddressForm from './forms/AddressForm';
import SecurityForm from './forms/SecurityForm';
import { updatePersonalInfo, updateCompanyInfo, updateAgentInfo, updatePassword } from '../../../../services/userService.js';

export default function Settings({ userType = 'personal' }) {
  const [activeSection, setActiveSection] = useState(
    userType === 'agent' ? 'security' : userType === 'company' ? 'company' : 'personal'
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (data) => {
    try {
      switch (userType) {
        case 'personal':
          await updatePersonalInfo(data);
          break;
        case 'company':
          await updateCompanyInfo(data);
          break;
        case 'agent':
          await updateAgentInfo(data);
          break;
        default:
          throw new Error('Type d\'utilisateur non valide');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalForm onSubmit={handleSubmit} />;
      case 'company':
        return <CompanyForm onSubmit={handleSubmit} />;
      case 'address':
        return <AddressForm onSubmit={handleSubmit} />;
      case 'security':
        return <SecurityForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5ff]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`${isMobile ? 'block' : 'grid grid-cols-4'}`}>
            {/* Menu latéral */}
            <div className={`${isMobile ? 'border-b' : 'border-r'} border-gray-200 bg-gray-50 p-6`}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Paramètres</h2>
              <SettingsMenu
                userType={userType}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                isMobile={isMobile}
              />
            </div>

            {/* Formulaire */}
            <div className={`${isMobile ? 'p-4' : 'col-span-3 p-8'}`}>
              <div className="max-w-3xl mx-auto">
                {renderForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}