<<<<<<< HEAD
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { countries } from 'countries-list';

// Image de fond
const backgroundImage = '../assets/';

// Liste des pays en français
const countryList = Object.values(countries).map(country => ({
  code: country.name,
  name: country.native
})).sort((a, b) => a.name.localeCompare(b.name));

const SignUp = () => {
  const [accountType, setAccountType] = useState('personal');
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');

  // Valeurs initiales pour le compte personnel
  const personalInitialValues = {
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    streetNumber: '',
    quarter: '',
    commune: '',
    city: '',
    province: '',
    country: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  // Valeurs initiales pour le compte entreprise
  const businessInitialValues = {
    companyName: '',
    foundingYear: '',
    companyEmail: '',
    companyPhone: '',
    streetNumber: '',
    quarter: '',
    commune: '',
    city: '',
    province: '',
    country: '',
    nationalId: '',
    rccm: '',
    taxNumber: '',
    taxDistrict: '',
    password: '',
    confirmPassword: '',
  };

  // Validation schemas for personal account
  const personalValidationSchemas = [
    // First step validation
    Yup.object({
      firstName: Yup.string().required('Le prénom est requis'),
      lastName: Yup.string().required('Le nom est requis'),
      birthDate: Yup.date().required('La date de naissance est requise'),
      birthPlace: Yup.string().required('Le lieu de naissance est requis'),
      nationality: Yup.string().required('La nationalité est requise'),
    }),
    // Second step validation
    Yup.object({
      streetNumber: Yup.string().required('Le numéro et avenue sont requis'),
      quarter: Yup.string().required('Le quartier est requis'),
      commune: Yup.string().required('La commune est requise'),
      city: Yup.string().required('La ville est requise'),
      province: Yup.string().required('La province est requise'),
      country: Yup.string().required('Le pays est requis'),
    }),
    // Third step validation
    Yup.object({
      email: Yup.string().email('Email invalide').required('L\'email est requis'),
      phone: Yup.string()
        .required('Le numéro de téléphone est requis'),
      password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
        .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
        .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
        .matches(/[^a-zA-Z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial')
        .required('Le mot de passe est requis'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('La confirmation du mot de passe est requise'),
    }),
  ];

  // Validation schemas for business account
  const businessValidationSchemas = [
    // First step validation
    Yup.object({
      companyName: Yup.string().required('Le nom de l\'entreprise est requis'),
      foundingYear: Yup.number()
        .min(1900, 'Année invalide')
        .max(new Date().getFullYear(), 'Année invalide')
        .required('L\'année de création est requise'),
      companyEmail: Yup.string().email('Email invalide').required('L\'email est requis'),
      companyPhone: Yup.string()
        .required('Le numéro de téléphone est requis'),
    }),
    // Second step validation (same as personal)
    Yup.object({
      streetNumber: Yup.string().required('Le numéro et avenue sont requis'),
      quarter: Yup.string().required('Le quartier est requis'),
      commune: Yup.string().required('La commune est requise'),
      city: Yup.string().required('La ville est requise'),
      province: Yup.string().required('La province est requise'),
      country: Yup.string().required('Le pays est requis'),
    }),
    // Third step validation
    Yup.object({
      nationalId: Yup.string().required('Le numéro d\'identification national est requis'),
      rccm: Yup.string().required('Le numéro RCCM est requis'),
      taxNumber: Yup.string().required('Le numéro d\'impôt est requis'),
      taxDistrict: Yup.string().required('Le numéro d\'impôt ressort est requis'),
      password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
        .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
        .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
        .matches(/[^a-zA-Z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial')
        .required('Le mot de passe est requis'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('La confirmation du mot de passe est requise'),
    }),
  ];

  const formik = useFormik({
    initialValues: accountType === 'personal' ? personalInitialValues : businessInitialValues,
    validationSchema: accountType === 'personal' 
      ? personalValidationSchemas[activeStep] 
      : businessValidationSchemas[activeStep],
    onSubmit: async (values) => {
      try {
        if (activeStep === 2) {
          // Handle final submission here
          console.log('Form submitted:', values);
        } else {
          handleNext();
        }
      } catch (err) {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    },
  });

  // Fonction pour gérer le changement d'étape
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Fonction pour gérer le changement de type de compte
  const handleAccountTypeChange = (event) => {
    const newAccountType = event.target.value;
    setAccountType(newAccountType);
    setActiveStep(0);
    formik.resetForm({
      values: newAccountType === 'personal' ? personalInitialValues : businessInitialValues
    });
  };

  const renderPersonalStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box className="space-y-4">
            <TextField
              fullWidth
              name="firstName"
              label="Prénom"
              placeholder="Héritier"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Nom de famille"
              placeholder="AMURI TCHALUMBA"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              name="birthPlace"
              label="Lieu de naissance"
              placeholder="Mwenga"
              value={formik.values.birthPlace}
              onChange={formik.handleChange}
              error={formik.touched.birthPlace && Boolean(formik.errors.birthPlace)}
              helperText={formik.touched.birthPlace && formik.errors.birthPlace}
            />
            <TextField
              fullWidth
              type="date"
              name="birthDate"
              label="Date de naissance"
              InputLabelProps={{ shrink: true }}
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
              helperText={formik.touched.birthDate && formik.errors.birthDate}
            />
            <TextField
              fullWidth
              name="nationality"
              label="Nationalité"
              placeholder="Congolais"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              error={formik.touched.nationality && Boolean(formik.errors.nationality)}
              helperText={formik.touched.nationality && formik.errors.nationality}
            />
          </Box>
        );
      case 1:
        return (
          <Box className="space-y-4">
            <TextField
              fullWidth
              name="streetNumber"
              label="N° et Avenue"
              placeholder="N° 049 Dikuta"
              value={formik.values.streetNumber}
              onChange={formik.handleChange}
              error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
              helperText={formik.touched.streetNumber && formik.errors.streetNumber}
            />
            <TextField
              fullWidth
              name="quarter"
              label="Quartier"
              placeholder="Kasika"
              value={formik.values.quarter}
              onChange={formik.handleChange}
              error={formik.touched.quarter && Boolean(formik.errors.quarter)}
              helperText={formik.touched.quarter && formik.errors.quarter}
            />
            <TextField
              fullWidth
              name="commune"
              label="Commune"
              placeholder="Goma"
              value={formik.values.commune}
              onChange={formik.handleChange}
              error={formik.touched.commune && Boolean(formik.errors.commune)}
              helperText={formik.touched.commune && formik.errors.commune}
            />
            <TextField
              fullWidth
              name="city"
              label="Ville ou territoire"
              placeholder="Goma"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              fullWidth
              name="province"
              label="Province"
              placeholder="Nord-Kivu"
              value={formik.values.province}
              onChange={formik.handleChange}
              error={formik.touched.province && Boolean(formik.errors.province)}
              helperText={formik.touched.province && formik.errors.province}
            />
            <FormControl fullWidth>
              <Select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Sélectionnez un pays
                </MenuItem>
                {countryList.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box className="space-y-4">
            <TextField
              fullWidth
              name="email"
              label="Adresse email"
              type="email"
              placeholder="zeropolemique@toyhe.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <PhoneInput
              country={'cd'}
              value={formik.values.phone}
              onChange={phone => formik.setFieldValue('phone', phone)}
              inputProps={{
                name: 'phone',
                required: true,
                placeholder: '990653676'
              }}
              containerClass="phone-input"
            />
            <TextField
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  const renderBusinessStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box className="space-y-4">
            <TextField
              fullWidth
              name="companyName"
              label="Nom de l'entreprise"
              placeholder="Ets SILIMU"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
            />
            <TextField
              fullWidth
              name="foundingYear"
              label="Année de création"
              placeholder="1980"
              type="number"
              value={formik.values.foundingYear}
              onChange={formik.handleChange}
              error={formik.touched.foundingYear && Boolean(formik.errors.foundingYear)}
              helperText={formik.touched.foundingYear && formik.errors.foundingYear}
            />
            <TextField
              fullWidth
              name="companyEmail"
              label="Email de l'entreprise"
              placeholder="bateausilimu@gmail.com"
              type="email"
              value={formik.values.companyEmail}
              onChange={formik.handleChange}
              error={formik.touched.companyEmail && Boolean(formik.errors.companyEmail)}
              helperText={formik.touched.companyEmail && formik.errors.companyEmail}
            />
            <PhoneInput
              country={'cd'}
              value={formik.values.companyPhone}
              onChange={phone => formik.setFieldValue('companyPhone', phone)}
              inputProps={{
                name: 'companyPhone',
                required: true,
              }}
              containerClass="phone-input"
            />
          </Box>
        );
      case 1:
        return (
          <Box className="space-y-4">
            <TextField
              fullWidth
              name="streetNumber"
              label="N° et Avenue"
              placeholder="N° 010 La Corniche"
              value={formik.values.streetNumber}
              onChange={formik.handleChange}
              error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
              helperText={formik.touched.streetNumber && formik.errors.streetNumber}
            />
            <TextField
              fullWidth
              name="quarter"
              label="Quartier"
              placeholder="Nkafu"
              value={formik.values.quarter}
              onChange={formik.handleChange}
              error={formik.touched.quarter && Boolean(formik.errors.quarter)}
              helperText={formik.touched.quarter && formik.errors.quarter}
            />
            <TextField
              fullWidth
              name="commune"
              label="Commune"
              placeholder="Kadutu"
              value={formik.values.commune}
              onChange={formik.handleChange}
              error={formik.touched.commune && Boolean(formik.errors.commune)}
              helperText={formik.touched.commune && formik.errors.commune}
            />
            <TextField
              fullWidth
              name="city"
              label="Ville ou territoire"
              placeholder="Bukavu"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              fullWidth
              name="province"
              label="Province"
              placeholder="Sud-Kivu"
              value={formik.values.province}
              onChange={formik.handleChange}
              error={formik.touched.province && Boolean(formik.errors.province)}
              helperText={formik.touched.province && formik.errors.province}
            />
            <FormControl fullWidth>
              <Select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Sélectionnez un pays
                </MenuItem>
                {countryList.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box className="space-y-4">
            <TextField
              fullWidth
              name="nationalId"
              label="Numéro d'identification national"
              placeholder="5-93-N43800 U Kin"
              value={formik.values.nationalId}
              onChange={formik.handleChange}
              error={formik.touched.nationalId && Boolean(formik.errors.nationalId)}
              helperText={formik.touched.nationalId && formik.errors.nationalId}
            />
            <TextField
              fullWidth
              name="rccm"
              label="Numéro RCCM"
              placeholder="CD/BKV/RCCM 14-A-1257"
              value={formik.values.rccm}
              onChange={formik.handleChange}
              error={formik.touched.rccm && Boolean(formik.errors.rccm)}
              helperText={formik.touched.rccm && formik.errors.rccm}
            />
            <TextField
              fullWidth
              name="taxNumber"
              label="Numéro d'impôt"
              placeholder="NIF A 1105664 U"
              value={formik.values.taxNumber}
              onChange={formik.handleChange}
              error={formik.touched.taxNumber && Boolean(formik.errors.taxNumber)}
              helperText={formik.touched.taxNumber && formik.errors.taxNumber}
            />
            <TextField
              fullWidth
              name="taxDistrict"
              label="Numéro d'impôt ressort"
              placeholder="PR/002/AX-18/1000181SK/Z"
              value={formik.values.taxDistrict}
              onChange={formik.handleChange}
              error={formik.touched.taxDistrict && Boolean(formik.errors.taxDistrict)}
              helperText={formik.touched.taxDistrict && formik.errors.taxDistrict}
            />
            <TextField
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      {/* Left side - Presentation */}
      <div 
        className="relative flex items-center justify-center p-8 md:w-1/2"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-600 opacity-10" />
        <div className="relative z-10 max-w-lg text-white">
          <Typography variant="h3" className="mb-6">
            Transport Lacustre Goma
          </Typography>
          <Typography variant="h5" className="mb-4">
            Bienvenue sur notre plateforme
          </Typography>
          <Typography variant="body1">
            Notre plateforme de réservation et de gestion du transport lacustre 
            vous permet de facilement planifier vos voyages sur le lac Kivu. 
            Créez votre compte dès maintenant pour profiter de nos services.
          </Typography>
        </div>
      </div>

      {/* Right side - Sign up form */}
      <div className="p-8 md:w-1/2">
        <Paper className="max-w-2xl p-8 mx-auto">
          <Typography variant="h4" className="mb-6 text-center">
            Créer un compte
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <FormControl component="fieldset" className="mb-6">
            <FormLabel component="legend">Type de compte</FormLabel>
            <RadioGroup
              row
              value={accountType}
              onChange={handleAccountTypeChange}
            >
              <FormControlLabel 
                value="personal" 
                control={<Radio />} 
                label="Compte personnel" 
              />
              <FormControlLabel 
                value="business" 
                control={<Radio />} 
                label="Compte entreprise" 
              />
            </RadioGroup>
          </FormControl>

          <Stepper activeStep={activeStep} className="mb-8">
            <Step>
              <StepLabel>Informations personnelles</StepLabel>
            </Step>
            <Step>
              <StepLabel>Adresse</StepLabel>
            </Step>
            <Step>
              <StepLabel>Sécurité</StepLabel>
            </Step>
          </Stepper>

          <form onSubmit={formik.handleSubmit}>
            {accountType === 'personal' 
              ? renderPersonalStepContent(activeStep)
              : renderBusinessStepContent(activeStep)}

            <Box className="flex justify-between mt-8">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Retour
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
              >
                {activeStep === 2 ? 'Créer le compte' : 'Suivant'}
              </Button>
            </Box>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default SignUp;
=======
import SignInForm from "./toyhe_app/auth/signinform";

const App = () => { 
 
return  (  
  <>
    <SignInForm />
  </>
)

}

export default App 
>>>>>>> origin/project_structure
