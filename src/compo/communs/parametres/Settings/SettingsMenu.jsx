import React from 'react';
import { 
  User, Building2, Shield, MapPin, 
  KeyRound
} from 'lucide-react';

const MenuSection = ({ icon: Icon, title, isActive, onClick, isMobile }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
      isActive 
        ? 'bg-blue-100 text-[#1c75bc]' 
        : 'hover:bg-gray-50'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5" />
      <span className="font-medium">{title}</span>
    </div>
  </button>
);

export default function SettingsMenu({ userType, activeSection, onSectionChange, isMobile }) {
  const sections = {
    personal: [
      { id: 'personal', icon: User, title: 'Informations personnelles' },
      { id: 'address', icon: MapPin, title: 'Adresse' },
      { id: 'security', icon: Shield, title: 'Sécurité' },
    ],
    company: [
      { id: 'company', icon: Building2, title: 'Informations de l\'entreprise' },
      { id: 'address', icon: MapPin, title: 'Adresse' },
      { id: 'security', icon: Shield, title: 'Sécurité' },
    ],
    agent: [
      { id: 'security', icon: KeyRound, title: 'Changer le mot de passe' },
    ],
  };

  const currentSections = sections[userType] || [];

  return (
    <div className="space-y-2">
      {currentSections.map((section) => (
        <MenuSection
          key={section.id}
          {...section}
          isActive={activeSection === section.id}
          onClick={() => onSectionChange(section.id)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}