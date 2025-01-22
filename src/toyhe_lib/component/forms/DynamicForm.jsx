import React from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
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

const POSTES = [
  'Directeur Général',
  'Directeur Admnistratif et Financier',
  'Guichetier',
  'Directeur de Succursale de Goma',
  'Agent du Service Marketing',
  'Agent du Service d\'Exploitation',
  'Agent du Service du Personnel'
];

const LOCATIONS = ['Goma', 'Bukavu'];

const DynamicForm = ({ 
  formType = 'user', // 'user', 'agent', ou 'enterprise'
  onSubmit,
  initialValues = {}
}) => {
  // Configuration des champs selon le type de formulaire
  const getFieldConfig = () => {
    const baseFields = {
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

    switch (formType) {
      case 'agent':
        return {
          ...baseFields,
          location: '',
          poste: '',
        };
      case 'enterprise':
        return {
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
          partnershipEndDate: '',
          password: '',
          confirmPassword: '',
        };
      default:
        return baseFields;
    }
  };

  // Schéma de validation
  const getValidationSchema = () => {
    const baseSchema = {
      firstName: Yup.string().required('Le prénom est requis'),
      lastName: Yup.string().required('Le nom est requis'),
      birthDate: Yup.date().required('La date de naissance est requise'),
      birthPlace: Yup.string().required('Le lieu de naissance est requis'),
      nationality: Yup.string().required('La nationalité est requise'),
      streetNumber: Yup.string().required('Le numéro et avenue sont requis'),
      quarter: Yup.string().required('Le quartier est requis'),
      commune: Yup.string().required('La commune est requise'),
      city: Yup.string().required('La ville est requise'),
      province: Yup.string().required('La province est requise'),
      country: Yup.string().required('Le pays est requis'),
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
    };

    switch (formType) {
      case 'agent':
        return Yup.object({
          ...baseSchema,
          location: Yup.string().required('Le lieu d\'affectation est requis'),
          poste: Yup.string().required('Le poste est requis'),
        });
      case 'enterprise':
        return Yup.object({
          companyName: Yup.string().required('Le nom de l\'entreprise est requis'),
          foundingYear: Yup.number()
            .min(1900, 'Année invalide')
            .max(new Date().getFullYear(), 'Année invalide')
            .required('L\'année de création est requise'),
          companyEmail: Yup.string().email('Email invalide').required('L\'email est requis'),
          companyPhone: Yup.string().required('Le numéro de téléphone est requis'),
          streetNumber: Yup.string().required('Le numéro et avenue sont requis'),
          quarter: Yup.string().required('Le quartier est requis'),
          commune: Yup.string().required('La commune est requise'),
          city: Yup.string().required('La ville est requise'),
          province: Yup.string().required('La province est requise'),
          country: Yup.string().required('Le pays est requis'),
          nationalId: Yup.string().required('Le numéro d\'identification national est requis'),
          rccm: Yup.string().required('Le numéro RCCM est requis'),
          taxNumber: Yup.string().required('Le numéro d\'impôt est requis'),
          taxDistrict: Yup.string().required('Le numéro d\'impôt ressort est requis'),
          partnershipEndDate: Yup.date().required('La date de fin de partenariat est requise'),
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
        });
      default:
        return Yup.object(baseSchema);
    }
  };

  const formik = useFormik({
    initialValues: { ...getFieldConfig(), ...initialValues },
    validationSchema: getValidationSchema(),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const renderFields = () => {
    const fields = [];

    if (formType === 'enterprise') {
      // Champs spécifiques à l'entreprise
      fields.push(
        <TextField
          key="companyName"
          fullWidth
          id="companyName"
          name="companyName"
          label="Nom de l'entreprise"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          error={formik.touched.companyName && Boolean(formik.errors.companyName)}
          helperText={formik.touched.companyName && formik.errors.companyName}
          margin="normal"
        />,
        <TextField
          key="foundingYear"
          fullWidth
          id="foundingYear"
          name="foundingYear"
          label="Année de création"
          type="number"
          value={formik.values.foundingYear}
          onChange={formik.handleChange}
          error={formik.touched.foundingYear && Boolean(formik.errors.foundingYear)}
          helperText={formik.touched.foundingYear && formik.errors.foundingYear}
          margin="normal"
        />,
        // Autres champs spécifiques à l'entreprise...
      );
    } else {
      // Champs communs pour utilisateur et agent
      fields.push(
        <TextField
          key="firstName"
          fullWidth
          id="firstName"
          name="firstName"
          label="Prénom"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          margin="normal"
        />,
        <TextField
          key="lastName"
          fullWidth
          id="lastName"
          name="lastName"
          label="Nom"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          margin="normal"
        />,
        // Autres champs communs...
      );

      if (formType === 'agent') {
        // Champs spécifiques à l'agent
        fields.push(
          <FormControl fullWidth margin="normal" key="location">
            <FormLabel>Lieu d'affectation</FormLabel>
            <Select
              id="location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
            >
              {LOCATIONS.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>,
          <FormControl fullWidth margin="normal" key="poste">
            <FormLabel>Poste</FormLabel>
            <Select
              id="poste"
              name="poste"
              value={formik.values.poste}
              onChange={formik.handleChange}
              error={formik.touched.poste && Boolean(formik.errors.poste)}
            >
              {POSTES.map((poste) => (
                <MenuItem key={poste} value={poste}>
                  {poste}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
    }

    // Ajout des champs d'adresse communs à tous les types
    fields.push(
      <TextField
        key="streetNumber"
        fullWidth
        id="streetNumber"
        name="streetNumber"
        label="Numéro et avenue"
        value={formik.values.streetNumber}
        onChange={formik.handleChange}
        error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
        helperText={formik.touched.streetNumber && formik.errors.streetNumber}
        margin="normal"
      />,
      // Autres champs d'adresse...
    );

    return fields;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {renderFields()}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Soumettre
        </Button>
      </Box>
    </form>
  );
};

export default DynamicForm;
