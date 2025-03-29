import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/signupService.js';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

const ACCOUNT_TYPES = {
  PERSONAL: 'personal',
  BUSINESS: 'business'
};

const PLACEHOLDERS = {
  firstName: {
    default: 'Prénom',
    example: 'Ex : Héritier'
  },
  lastName: {
    default: 'Nom de famille',
    example: 'Ex : AMURI TCHALUMBA'
  },
  gender: {
    default: 'Genre',
    example: 'Sélectionnez votre genre'
  },
  companyName: {
    default: 'Nom de l\'entreprise',
    example: 'Ex : Ets SILIMU'
  },
  foundingYear: {
    default: 'Année de création',
    example: 'Ex : 2020'
  },
  phone: {
    default: 'Numéro de téléphone',
    example: 'Ex : +243 999 999 999'
  },
  email: {
    default: 'Adresse email',
    example: 'Ex : contact@entreprise.com'
  },
  password: {
    default: 'Mot de passe',
    example: 'Min. 8 caractères avec majuscule, minuscule, chiffre et caractère spécial'
  },
  confirmPassword: {
    default: 'Confirmer le mot de passe',
    example: 'Retapez votre mot de passe'
  }
};

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  gender: '',
  companyName: '',
  foundingYear: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  isCompany: false
};

const SignUp = () => {

  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPES.PERSONAL);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset form data when account type changes
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  }, [accountType]);

  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    const requirements = [];
    if (!hasLowerCase) requirements.push('une minuscule');
    if (!hasUpperCase) requirements.push('une majuscule');
    if (!hasSpecialChar) requirements.push('un caractère spécial');
    if (!hasNumber) requirements.push('un chiffre');
    if (!hasMinLength) requirements.push('8 caractères minimum');

    return {
      isValid: hasLowerCase && hasUpperCase && hasSpecialChar && hasNumber && hasMinLength,
      requirements
    };
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phone) newErrors.phone = 'Le numéro de téléphone est requis';
    if (!formData.email) newErrors.email = 'L\'adresse email est requise';
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = `Le mot de passe doit contenir : ${passwordValidation.requirements.join(', ')}`;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (accountType === ACCOUNT_TYPES.PERSONAL) {
      if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
      if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
      if (!formData.gender) newErrors.gender = 'Le genre est requis';
    } else {
      if (!formData.companyName) newErrors.companyName = 'Le nom de l\'entreprise est requis';
      if (!formData.foundingYear) newErrors.foundingYear = 'L\'année de création est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (formData) => {
    const result = await signup(formData, navigate);
  
    if (result.success) {
      console.log("Compte créé avec succès !");
      navigate("/dashboard"); // Redirection après succès
    } else {
      alert(result.error); // Affiche l'erreur si échec
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
  
    if (validateForm()) { // Vérifie si le formulaire est valide
      try {
        await handleSignup(formData); // Envoie les données
      } catch (error) {
        console.error("Erreur lors de l’inscription:", error);
      }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && 
           Object.values(formData).some(value => value !== '') &&
           formData.password === formData.confirmPassword;
  };

  const getPlaceholder = (fieldName) => {
    return focusedField === fieldName ? PLACEHOLDERS[fieldName].example : PLACEHOLDERS[fieldName].default;
  };

  return (
    <div className="flex flex-col w-full min-h-screen md:flex-row">
      {/* Left side - Presentation */}
      <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-screen">
        <div className="absolute inset-0 bg-center bg-cover"
             style={{ backgroundImage: 'url("/assets/bateaux/Bateau.jpg")' }}>
          <div className="absolute inset-0 bg-opacity-75 bg-primary"></div>
        </div>
        <div className="relative flex items-center justify-center h-full p-6 md:p-12">
          <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-xl md:p-8">
            <img 
              src="/assets/logos/TOYHE_LOGO_250x250.png"
              alt="Logo de la plateforme TOYHE"
              className="w-auto h-12 mx-auto mb-4 md:h-16 md:mb-6"
            />
            <div className="text-center text-primary-dark">
              <h1 className="mb-4 text-2xl font-bold md:text-3xl md:mb-6">Plateforme de transport Lacustre</h1>
              <p className="text-base leading-relaxed md:text-lg">
                Bienvenue sur notre plateforme.<br /><br />
                Notre plateforme de réservation et de gestion du transport lacustre vous permet de facilement planifier vos voyages sur le Lac Kivu.<br /><br />
                Créez votre compte dès maintenant !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center w-full p-6 md:w-1/2 bg-input-gray md:p-12">
        <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-xl md:p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
          </div>

          {/* Account Type Selection */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Type de compte</h3>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  checked={accountType === ACCOUNT_TYPES.PERSONAL}
                  onChange={() => {
                    setAccountType(ACCOUNT_TYPES.PERSONAL);
                    setFormData({ ...formData, isCompany: false });
                  }}
                  className="w-5 h-5 border-gray-400 text-primary"
                />
                <span className="text-gray-700">Compte personnel</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  checked={accountType === ACCOUNT_TYPES.BUSINESS}
                  onChange={() => {
                    setAccountType(ACCOUNT_TYPES.PERSONAL);
                    setFormData({ ...formData, isCompany: true });
                  }}
                  className="w-5 h-5 border-gray-400 text-primary"
                />
                <span className="text-gray-700">Compte entreprise</span>
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {accountType === ACCOUNT_TYPES.PERSONAL ? (
              <>
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={getPlaceholder('firstName')}
                    className={classNames(
                      'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary',
                      errors.firstName ? 'border-[#e93e3a]' : ''
                    )}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-[#e93e3a]">{errors.firstName}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={getPlaceholder('lastName')}
                    className={classNames(
                      'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary',
                      errors.lastName ? 'border-[#e93e3a]' : ''
                    )}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-[#e93e3a]">{errors.lastName}</p>}
                </div>
                <div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('gender')}
                    onBlur={() => setFocusedField(null)}
                    className={classNames(
                      'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary appearance-none',
                      errors.gender ? 'border-[#e93e3a]' : '',
                      !formData.gender && 'text-gray-500'
                    )}
                  >
                    <option value="">{getPlaceholder('gender')}</option>
                    <option value="male">Masculin</option>
                    <option value="female">Féminin</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-[#e93e3a]">{errors.gender}</p>}
                </div>
              </>
            ) : (
              <>
                <div>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('companyName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={getPlaceholder('companyName')}
                    className={classNames(
                      'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary',
                      errors.companyName ? 'border-[#e93e3a]' : ''
                    )}
                  />
                  {errors.companyName && <p className="mt-1 text-sm text-[#e93e3a]">{errors.companyName}</p>}
                </div>
                <div>
                  <input
                    type="number"
                    name="foundingYear"
                    value={formData.foundingYear}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('foundingYear')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={getPlaceholder('foundingYear')}
                    min="1900"
                    max={new Date().getFullYear()}
                    className={classNames(
                      'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary',
                      errors.foundingYear ? 'border-[#e93e3a]' : ''
                    )}
                  />
                  {errors.foundingYear && <p className="mt-1 text-sm text-[#e93e3a]">{errors.foundingYear}</p>}
                </div>
              </>
            )}

            {/* Common fields */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder={getPlaceholder('phone')}
                className={classNames(
                  'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary',
                  errors.phone ? 'border-[#e93e3a]' : ''
                )}
              />
              {errors.phone && <p className="mt-1 text-sm text-[#e93e3a]">{errors.phone}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder={getPlaceholder('email')}
                className={classNames(
                  'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary',
                  errors.email ? 'border-[#e93e3a]' : ''
                )}
              />
              {errors.email && <p className="mt-1 text-sm text-[#e93e3a]">{errors.email}</p>}
            </div>

            <div className="relative">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={getPlaceholder('password')}
                  className={classNames(
                    'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary pr-12',
                    errors.password ? 'border-[#e93e3a]' : ''
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-[#e93e3a]">{errors.password}</p>}
            </div>

            <div className="relative">
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={getPlaceholder('confirmPassword')}
                  className={classNames(
                    'w-full h-12 px-4 rounded-lg bg-input-gray border border-gray-400 focus:border-primary focus:ring-primary pr-12',
                    errors.confirmPassword ? 'border-[#e93e3a]' : ''
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-[#e93e3a]">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={classNames(
                'w-full h-12 px-4 rounded-lg text-white font-medium transition-colors',
                isFormValid()
                  ? 'bg-primary hover:bg-primary-dark'
                  : 'bg-gray-300 cursor-not-allowed'
              )}
            >
              Créer mon compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;