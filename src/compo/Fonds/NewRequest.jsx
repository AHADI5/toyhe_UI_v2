import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';

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

  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Ici, vous ajouteriez la logique pour envoyer la demande
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
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
                  label="Montant ($)"
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
            <input
              type="file"
              id="file-upload"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button variant="outlined" component="span" fullWidth>
                Ajouter un justificatif
              </Button>
            </label>
            {selectedFile && (
              <Box display="flex" alignItems="center" mt={2}>
                {selectedFile.type === 'application/pdf' ? (
                  <PictureAsPdfIcon color="error" sx={{ mr: 1 }} />
                ) : (
                  <InsertDriveFileIcon color="primary" sx={{ mr: 1 }} />
                )}
                <Typography variant="body1">{selectedFile.name}</Typography>
                <IconButton onClick={removeFile} color="secondary" sx={{ ml: 1 }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
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
