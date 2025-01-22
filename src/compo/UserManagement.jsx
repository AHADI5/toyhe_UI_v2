import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddUserDialog from './AddUserDialog';  // Correction de l'importation ici

// Couleur principale
const mainColor = '#2b3990';

const UserManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mt: 4, 
          borderRadius: 2 
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3 
          }}
        >
          <Typography variant="h5" component="h1" color="primary" sx={{ color: mainColor }}>
            Gestion des Utilisateurs
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              bgcolor: mainColor,
              '&:hover': {
                bgcolor: mainColor,
                opacity: 0.9
              }
            }}
          >
            Ajouter un utilisateur
          </Button>
        </Box>
        
        <AddUserDialog 
          open={openDialog} 
          onClose={handleCloseDialog}
        />
      </Paper>
    </Container>
  );
};

export default UserManagement;