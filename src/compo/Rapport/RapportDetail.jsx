import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { colors } from '../../theme/colors';

const RapportDetail = ({ rapport, open, onClose, onValidate, onReject, isAdmin }) => {
  if (!rapport) return null;

  // Fonction pour déterminer l'icône en fonction du type de fichier
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    if (extension === 'pdf') {
      return <PictureAsPdfIcon sx={{ color: '#f44336' }} />;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
      return <ImageIcon sx={{ color: '#ff9800' }} />;
    } else if (['doc', 'docx', 'txt', 'rtf'].includes(extension)) {
      return <DescriptionIcon sx={{ color: '#2196f3' }} />;
    } else {
      return <InsertDriveFileIcon sx={{ color: '#9e9e9e' }} />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper'
        }
      }}
    >
      <DialogTitle sx={{ bgcolor: colors.background, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ color: colors.secondary }}>
          {rapport.titre}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Date d'envoi: {format(new Date(rapport.date), 'dd MMMM yyyy', { locale: fr })}
          </Typography>
          {isAdmin && (
            <Typography variant="subtitle2" color="text.secondary">
              Agent: {rapport.agent}
            </Typography>
          )}
          <Chip
            label={rapport.status}
            sx={{
              mt: 1,
              backgroundColor: 
                rapport.status === 'Validé' ? colors.primary :
                rapport.status === 'Refusé' ? colors.danger :
                colors.warning,
              color: 'white'
            }}
          />
        </Box>

        <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
          {rapport.description}
        </Typography>

        {rapport.fichiers?.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: colors.secondary }}>
              Fichiers joints:
            </Typography>
            <List dense>
              {rapport.fichiers.map((fichier, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {getFileIcon(fichier.nom)}
                  </ListItemIcon>
                  <ListItemText 
                    primary={fichier.nom} 
                  />
                  <IconButton 
                    component="a" 
                    href={fichier.url} 
                    download={fichier.nom}
                    sx={{ color: colors.primary }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: colors.background }}>
        {isAdmin && rapport.status === 'En attente' && (
          <>
            <Button
              onClick={() => onReject(rapport.id)}
              variant="contained"
              sx={{
                bgcolor: colors.danger,
                '&:hover': { bgcolor: '#d32f2f' }
              }}
            >
              Refuser
            </Button>
            <Button
              onClick={() => onValidate(rapport.id)}
              variant="contained"
              sx={{
                bgcolor: colors.primary,
                '&:hover': { bgcolor: colors.secondary }
              }}
            >
              Valider
            </Button>
          </>
        )}
        <Button onClick={onClose} variant="outlined">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RapportDetail;