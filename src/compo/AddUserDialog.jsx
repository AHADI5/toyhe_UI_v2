import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
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
  useTheme,
  useMediaQuery,
  InputLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { countries } from 'countries-list';

// Liste des pays en français
const countryList = Object.values(countries).map(country => ({
  code: country.name,
  name: country.native
})).sort((a, b) => a.name.localeCompare(b.name));

// Couleur principale
const mainColor = '#2b3990';

// Liste des postes disponibles
const postes = [
  'Directeur Général',
  'Directeur Administratif et Financier',
  'Guichetier',
  'Directeur de Succursale de Goma',
  'Agent du Service Marketing',
  'Agent du Service d\'Exploitation',
  'Agent du Service du Personnel'
];

// Liste des lieux d'affectation
const lieuxAffectation = ['Goma', 'Bukavu'];

// Liste des genres
const genres = ['Masculin', 'Féminin'];

const AddUserDialog = ({ open, onClose }) => {
  const [userType, setUserType] = useState('agent');
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Réinitialiser le formulaire quand la boîte de dialogue s'ouvre
  React.useEffect(() => {
    if (open) {
      formik.resetForm();
      setActiveStep(0);
    }
  }, [open]);

  // Style global pour la couleur de la barre de défilement
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        background: ${mainColor};
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${mainColor}cc;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Valeurs initiales pour un agent
  const agentInitialValues = {
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    sexe: '',
    poste: '',
    lieuAffectation: '',
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

  // Valeurs initiales pour une entreprise
  const entrepriseInitialValues = {
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
    dateFinPartenariat: '',
    password: '',
    confirmPassword: '',
  };

  // Schémas de validation pour un agent
  const agentValidationSchemas = [
    // Première étape
    Yup.object({
      firstName: Yup.string().required('Le prénom est requis'),
      lastName: Yup.string().required('Le nom est requis'),
      birthDate: Yup.date()
        .required('La date de naissance est requise')
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'Vous devez avoir au moins 18 ans')
        .typeError('Date invalide'),
      birthPlace: Yup.string().required('Le lieu de naissance est requis'),
      nationality: Yup.string().required('La nationalité est requise'),
      sexe: Yup.string().required('Le sexe est requis'),
      poste: Yup.string().required('Le poste est requis'),
      lieuAffectation: Yup.string().required('Le lieu d\'affectation est requis'),
    }),
    // Deuxième étape
    Yup.object({
      streetNumber: Yup.string().required('Le numéro et avenue sont requis'),
      quarter: Yup.string().required('Le quartier est requis'),
      commune: Yup.string().required('La commune est requise'),
      city: Yup.string().required('La ville est requise'),
      province: Yup.string().required('La province est requise'),
      country: Yup.string().required('Le pays est requis'),
    }),
    // Troisième étape
    Yup.object({
      email: Yup.string().email('Email invalide').required('L\'email est requis'),
      phone: Yup.string().required('Le numéro de téléphone est requis'),
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

  // Schémas de validation pour une entreprise
  const entrepriseValidationSchemas = [
    // Première étape
    Yup.object({
      companyName: Yup.string().required('Le nom de l\'entreprise est requis'),
      foundingYear: Yup.number()
        .min(1900, 'Année invalide')
        .max(new Date().getFullYear(), 'Année invalide')
        .required('L\'année de création est requise'),
      companyEmail: Yup.string().email('Email invalide').required('L\'email est requis'),
      companyPhone: Yup.string().required('Le numéro de téléphone est requis'),
      dateFinPartenariat: Yup.date().required('La date de fin de partenariat est requise'),
    }),
    // Deuxième étape
    Yup.object({
      streetNumber: Yup.string().required('Le numéro et avenue sont requis'),
      quarter: Yup.string().required('Le quartier est requis'),
      commune: Yup.string().required('La commune est requise'),
      city: Yup.string().required('La ville est requise'),
      province: Yup.string().required('La province est requise'),
      country: Yup.string().required('Le pays est requis'),
    }),
    // Troisième étape
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
    initialValues: userType === 'agent' ? agentInitialValues : entrepriseInitialValues,
    validationSchema: userType === 'agent' 
      ? agentValidationSchemas[activeStep] 
      : entrepriseValidationSchemas[activeStep],
    onSubmit: async (values) => {
      try {
        if (activeStep === 2) {
          // Traitement final du formulaire
          console.log('Formulaire soumis:', values);
          formik.resetForm();
          setActiveStep(0);
          onClose();
        } else {
          handleNext();
        }
      } catch (err) {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleUserTypeChange = (event) => {
    const newUserType = event.target.value;
    setUserType(newUserType);
    setActiveStep(0);
    formik.resetForm({
      values: newUserType === 'agent' ? agentInitialValues : entrepriseInitialValues
    });
  };

  const renderStepContent = (step) => {
    if (userType === 'agent') {
      switch (step) {
        case 0:
          return (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Prénom"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Nom"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Sexe</InputLabel>
                <Select
                  name="sexe"
                  value={formik.values.sexe}
                  onChange={formik.handleChange}
                  error={formik.touched.sexe && Boolean(formik.errors.sexe)}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date de naissance"
                name="birthDate"
                InputLabelProps={{ shrink: true }}
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                helperText={formik.touched.birthDate && formik.errors.birthDate}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Lieu de naissance"
                name="birthPlace"
                value={formik.values.birthPlace}
                onChange={formik.handleChange}
                error={formik.touched.birthPlace && Boolean(formik.errors.birthPlace)}
                helperText={formik.touched.birthPlace && formik.errors.birthPlace}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Nationalité</InputLabel>
                <Select
                  name="nationality"
                  value={formik.values.nationality}
                  onChange={formik.handleChange}
                  error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                >
                  {countryList.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Poste</InputLabel>
                <Select
                  name="poste"
                  value={formik.values.poste}
                  onChange={formik.handleChange}
                  error={formik.touched.poste && Boolean(formik.errors.poste)}
                >
                  {postes.map((poste) => (
                    <MenuItem key={poste} value={poste}>
                      {poste}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Lieu d'affectation</InputLabel>
                <Select
                  name="lieuAffectation"
                  value={formik.values.lieuAffectation}
                  onChange={formik.handleChange}
                  error={formik.touched.lieuAffectation && Boolean(formik.errors.lieuAffectation)}
                >
                  {lieuxAffectation.map((lieu) => (
                    <MenuItem key={lieu} value={lieu}>
                      {lieu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          );
        case 1:
          return (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Numéro et Avenue"
                name="streetNumber"
                value={formik.values.streetNumber}
                onChange={formik.handleChange}
                error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
                helperText={formik.touched.streetNumber && formik.errors.streetNumber}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Quartier"
                name="quarter"
                value={formik.values.quarter}
                onChange={formik.handleChange}
                error={formik.touched.quarter && Boolean(formik.errors.quarter)}
                helperText={formik.touched.quarter && formik.errors.quarter}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Commune"
                name="commune"
                value={formik.values.commune}
                onChange={formik.handleChange}
                error={formik.touched.commune && Boolean(formik.errors.commune)}
                helperText={formik.touched.commune && formik.errors.commune}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Ville"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Province"
                name="province"
                value={formik.values.province}
                onChange={formik.handleChange}
                error={formik.touched.province && Boolean(formik.errors.province)}
                helperText={formik.touched.province && formik.errors.province}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Pays</InputLabel>
                <Select
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                >
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
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <PhoneInput
                country={'cd'}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue('phone', phone)}
                inputStyle={{ width: '100%' }}
                containerStyle={{ marginTop: '16px', marginBottom: '8px' }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Mot de passe"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Confirmer le mot de passe"
                name="confirmPassword"
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
    } else {
      // Contenu pour entreprise
      switch (step) {
        case 0:
          return (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Nom de l'entreprise"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Année de création"
                name="foundingYear"
                type="number"
                value={formik.values.foundingYear}
                onChange={formik.handleChange}
                error={formik.touched.foundingYear && Boolean(formik.errors.foundingYear)}
                helperText={formik.touched.foundingYear && formik.errors.foundingYear}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email de l'entreprise"
                name="companyEmail"
                type="email"
                value={formik.values.companyEmail}
                onChange={formik.handleChange}
                error={formik.touched.companyEmail && Boolean(formik.errors.companyEmail)}
                helperText={formik.touched.companyEmail && formik.errors.companyEmail}
              />
              <PhoneInput
                country={'cd'}
                value={formik.values.companyPhone}
                onChange={(phone) => formik.setFieldValue('companyPhone', phone)}
                inputStyle={{ width: '100%' }}
                containerStyle={{ marginTop: '16px', marginBottom: '8px' }}
              />
              <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Date de fin de partenariat"
                name="dateFinPartenariat"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dateFinPartenariat}
                onChange={formik.handleChange}
                error={formik.touched.dateFinPartenariat && Boolean(formik.errors.dateFinPartenariat)}
                helperText={formik.touched.dateFinPartenariat && formik.errors.dateFinPartenariat}
              />
            </Box>
          );
        case 1:
          return (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Numéro et Avenue"
                name="streetNumber"
                value={formik.values.streetNumber}
                onChange={formik.handleChange}
                error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
                helperText={formik.touched.streetNumber && formik.errors.streetNumber}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Quartier"
                name="quarter"
                value={formik.values.quarter}
                onChange={formik.handleChange}
                error={formik.touched.quarter && Boolean(formik.errors.quarter)}
                helperText={formik.touched.quarter && formik.errors.quarter}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Commune"
                name="commune"
                value={formik.values.commune}
                onChange={formik.handleChange}
                error={formik.touched.commune && Boolean(formik.errors.commune)}
                helperText={formik.touched.commune && formik.errors.commune}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Ville"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Province"
                name="province"
                value={formik.values.province}
                onChange={formik.handleChange}
                error={formik.touched.province && Boolean(formik.errors.province)}
                helperText={formik.touched.province && formik.errors.province}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Pays</InputLabel>
                <Select
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                >
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
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Numéro d'identification national"
                name="nationalId"
                value={formik.values.nationalId}
                onChange={formik.handleChange}
                error={formik.touched.nationalId && Boolean(formik.errors.nationalId)}
                helperText={formik.touched.nationalId && formik.errors.nationalId}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Numéro RCCM"
                name="rccm"
                value={formik.values.rccm}
                onChange={formik.handleChange}
                error={formik.touched.rccm && Boolean(formik.errors.rccm)}
                helperText={formik.touched.rccm && formik.errors.rccm}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Numéro d'impôt"
                name="taxNumber"
                value={formik.values.taxNumber}
                onChange={formik.handleChange}
                error={formik.touched.taxNumber && Boolean(formik.errors.taxNumber)}
                helperText={formik.touched.taxNumber && formik.errors.taxNumber}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Numéro d'impôt ressort"
                name="taxDistrict"
                value={formik.values.taxDistrict}
                onChange={formik.handleChange}
                error={formik.touched.taxDistrict && Boolean(formik.errors.taxDistrict)}
                helperText={formik.touched.taxDistrict && formik.errors.taxDistrict}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Mot de passe"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Confirmer le mot de passe"
                name="confirmPassword"
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
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          '& .MuiStepIcon-root': {
            color: 'grey.400',
            '&.Mui-active, &.Mui-completed': {
              color: mainColor,
            },
          },
          '& .MuiButton-contained': {
            backgroundColor: mainColor,
            '&:hover': {
              backgroundColor: mainColor,
              opacity: 0.9,
            },
          },
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: mainColor }}>
            Ajouter un {userType === 'agent' ? 'agent' : 'partenaire'}
          </Typography>
          <Button 
            onClick={onClose}
            sx={{ 
              minWidth: 'auto', 
              p: 1,
              color: mainColor,
              fontSize: '2rem',
              '&:hover': {
                bgcolor: 'rgba(43, 57, 144, 0.04)'
              }
            }}
          >
            ×
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel 
              component="legend" 
              sx={{ 
                color: `${mainColor} !important`,
                '&.Mui-focused': {
                  color: `${mainColor} !important`,
                }
              }}
            >
              Type de compte
            </FormLabel>
            <RadioGroup
              row
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <FormControlLabel 
                value="agent" 
                control={
                  <Radio 
                    sx={{
                      color: mainColor,
                      '&.Mui-checked': {
                        color: mainColor,
                      },
                    }}
                  />
                } 
                label="Agent" 
              />
              <FormControlLabel 
                value="entreprise" 
                control={
                  <Radio 
                    sx={{
                      color: mainColor,
                      '&.Mui-checked': {
                        color: mainColor,
                      },
                    }}
                  />
                } 
                label="Entreprise" 
              />
            </RadioGroup>
          </FormControl>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            <Step>
              <StepLabel>Informations personnelles</StepLabel>
            </Step>
            <Step>
              <StepLabel>Adresse</StepLabel>
            </Step>
            <Step>
              <StepLabel>Authentification</StepLabel>
            </Step>
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            {renderStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                onClick={onClose}
                color="inherit"
                sx={{ display: activeStep === 2 ? 'block' : 'none' }}
              >
                Annuler
              </Button>
              <Box>
                <Button
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  disabled={activeStep === 0}
                >
                  Retour
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ 
                    bgcolor: mainColor,
                    '&:hover': {
                      bgcolor: mainColor,
                      opacity: 0.9,
                    },
                  }}
                >
                  {activeStep === 2 ? 'Ajouter' : 'Suivant'}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;