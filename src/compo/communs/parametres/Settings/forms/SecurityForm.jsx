import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { validatePassword } from '../../utils/validation';

export default function SecurityForm({ onSubmit }) {
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: '',
  });

  const [errors, setErrors] = useState({
    old: [],
    new: [],
    confirm: [],
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'new') {
      const validationErrors = validatePassword(value);
      setErrors(prev => ({
        ...prev,
        new: validationErrors
      }));
    } else if (field === 'confirm') {
      setErrors(prev => ({
        ...prev,
        confirm: value !== passwords.new ? ['Les mots de passe ne correspondent pas'] : []
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (passwords.old === passwords.new) {
      setErrors(prev => ({
        ...prev,
        new: ['Le nouveau mot de passe doit être différent de l\'ancien']
      }));
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setErrors(prev => ({
        ...prev,
        confirm: ['Les mots de passe ne correspondent pas']
      }));
      return;
    }

    const newPasswordErrors = validatePassword(passwords.new);
    if (newPasswordErrors.length > 0) {
      setErrors(prev => ({
        ...prev,
        new: newPasswordErrors
      }));
      return;
    }

    onSubmit(passwords);
  };

  const PasswordInput = ({ name, placeholder, show, value }) => (
    <div className="space-y-1">
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => handlePasswordChange(name, e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 px-4 pr-12 bg-[#f5f5ff] border-2 border-gray-300 rounded-lg focus:border-[#1c75bc] focus:ring-[#1c75bc] transition-colors"
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(name)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {show ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      {errors[name] && errors[name].length > 0 && (
        <ul className="space-y-1">
          {errors[name].map((error, index) => (
            <li key={index} className="text-sm text-[#e93e3a]">{error}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PasswordInput
          name="old"
          placeholder="Ancien mot de passe"
          show={showPasswords.old}
          value={passwords.old}
        />
        <PasswordInput
          name="new"
          placeholder="Nouveau mot de passe"
          show={showPasswords.new}
          value={passwords.new}
        />
        <PasswordInput
          name="confirm"
          placeholder="Confirmer nouveau mot de passe"
          show={showPasswords.confirm}
          value={passwords.confirm}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#1c75bc] text-white px-6 py-3 rounded-lg hover:bg-[#2b3990] transition-colors"
        >
          Mettre à jour le mot de passe
        </button>
      </div>
    </form>
  );
}