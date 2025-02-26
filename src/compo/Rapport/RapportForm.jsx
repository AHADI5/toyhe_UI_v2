import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, 
  TextField, 
  Button, 
  Paper,
  Typography,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Chip
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from '../../theme/colors';

const RapportForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append('titre', data.titre);
    formData.append('description', data.description);
    
    // Ajouter les fichiers sélectionnés
    selectedFiles.forEach(file => {
      formData.append('fichiers', file);
    });
    
    onSubmit(formData);
  };

  const handleFileChange = (event) => {
    if (event.target.files?.length) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      // Réinitialiser l'input pour permettre la sélection du même fichier
      event.target.value = '';
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Fonction pour obtenir l'extension du fichier
  const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  };

  // Fonction pour obtenir la couleur en fonction de l'extension
  const getFileColor = (filename) => {
    const ext = getFileExtension(filename).toLowerCase();
    if (['pdf'].includes(ext)) return '#f44336'; // Rouge pour PDF
    if (['doc', 'docx'].includes(ext)) return '#2196f3'; // Bleu pour Word
    if (['xls', 'xlsx'].includes(ext)) return '#4caf50'; // Vert pour Excel
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '#ff9800'; // Orange pour images
    return '#9e9e9e'; // Gris par défaut
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        backgroundColor: 'white',
        borderRadius: 2
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, color: colors.primary }}>
        Nouveau Rapport
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Titre du rapport"
          fullWidth
          error={!!errors.titre}
          helperText={errors.titre?.message}
          {...register('titre', { required: 'Le titre est requis' })}
        />

        <TextField
          label="Description détaillée"
          multiline
          rows={4}
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register('description', { required: 'La description est requise' })}
        />

        <Box>
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            sx={{ display: 'none' }}
            id="fichiers-input"
          />
          <label htmlFor="fichiers-input">
            <Button
              variant="outlined"
              component="span"
              sx={{ 
                color: colors.secondary,
                borderColor: colors.secondary,
                '&:hover': {
                  borderColor: colors.primary,
                  color: colors.primary
                }
              }}
            >
              Ajouter des fichiers justificatifs
            </Button>
          </label>
        </Box>

        {selectedFiles.length > 0 && (
          <Paper variant="outlined" sx={{ mt: 2, p: 2, maxHeight: '200px', overflow: 'auto' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Fichiers sélectionnés ({selectedFiles.length})
            </Typography>
            <List dense>
              {selectedFiles.map((file, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon sx={{ color: getFileColor(file.name) }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={file.name} 
                    secondary={`${(file.size / 1024).toFixed(1)} KB`} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Button 
          type="submit"
          variant="contained"
          sx={{ 
            mt: 2,
            bgcolor: colors.primary,
            '&:hover': {
              bgcolor: colors.secondary
            }
          }}
        >
          Envoyer le rapport
        </Button>
      </Box>
    </Paper>
  );
};

export default RapportForm;