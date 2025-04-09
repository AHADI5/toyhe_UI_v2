import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid
} from '@mui/material';

const categories = [
  { value: 'exploitation', label: 'Exploitation' },
  { value: 'administratif', label: 'Administratif' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'investissement', label: 'Investissement' },
  { value: 'urgence', label: 'Urgence' }
];

const NewRequest = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      category: '',
      amount: '',
      description: '',
      documents: null
    }
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Ici, vous ajouteriez la logique pour envoyer la demande
  };

  return (
    <Paper elevation={0}>
      <Typography variant="h5" gutterBottom>
        Nouvelle Demande de Fonds
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'La catégorie est requise' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Catégorie"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: 'Le montant est requis',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Montant invalide'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Montant (€)"
                  type="number"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'La description est requise' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label="Description détaillée"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="documents"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <TextField
                  {...field}
                  type="file"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label="Justificatifs"
                  onChange={(e) => onChange(e.target.files)}
                  inputProps={{ multiple: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Envoyer la demande
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default NewRequest;