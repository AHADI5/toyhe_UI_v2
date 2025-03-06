import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function BoiteDeDialogue({ open, onClose, title, description, user, mode }) {
  const [editableUser, setEditableUser] = useState(user);

  const handleInputChange = (e) => {
    setEditableUser({
      ...editableUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = (e, reason) => {
    // Empêche la fermeture quand on clique en dehors de la boîte ou appuie sur Échap
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slotProps={{
        backdrop: {
          invisible: true, // Désactive l'arrière-plan sombre
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0',
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
        {mode === 'view' && (
          <>
            <Box mb={2}>
              <p><strong>Nom : </strong>{user.nom}</p>
            </Box>
            <Box mb={2}>
              <p><strong>Post-nom : </strong>{user.postNom}</p>
            </Box>
            <Box mb={2}>
              <p><strong>Prénom : </strong>{user.prenom}</p>
            </Box>
            <Box mb={2}>
              <p><strong>Rôle : </strong>{user.role}</p>
            </Box>
          </>
        )}
        {mode === 'edit' && (
          <>
            <TextField
              label="Nom"
              name="nom"
              value={editableUser.nom}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Post-nom"
              name="postNom"
              value={editableUser.postNom}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={editableUser.prenom}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Rôle"
              name="role"
              value={editableUser.role}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {mode !== 'view' && (
          <>
            <Button onClick={onClose}>Annuler</Button>
            {mode === 'edit' && (
              <Button
                onClick={() => {
                  console.log('Utilisateur modifié:', editableUser);
                  onClose();
                }}
                autoFocus
              >
                Sauvegarder
              </Button>
            )}
            {mode === 'delete' && (
              <Button
                onClick={() => {
                  console.log('Utilisateur supprimé:', user);
                  onClose();
                }}
                autoFocus
              >
                Confirmer
              </Button>
            )}
          </>
        )}
        {mode === 'view' && (
          <Button onClick={onClose} autoFocus>
            Fermer
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
