import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit2, Check, X } from 'lucide-react';

const mockTrips = [
  { id: 1, date: '2024-03-15', from: 'Goma', to: 'Bukavu', status: 'Completed' },
  { id: 2, date: '2024-03-10', from: 'Bukavu', to: 'Goma', status: 'Completed' },
];

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\+?[0-9]{1,4}?\s?[0-9]{6,14}$/;
  return phoneRegex.test(phone);
};

function Account() {
  const [profileImage, setProfileImage] = useState('https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_cp0_dst-jpg_s40x40_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=IvjqSNH03KwQ7kNvgHYG1H7&_nc_oc=AdmDjqrOLDNkbF1EiRzYVCMpasKq2vo2DH8DpRmmpwSW2YT9TiiJRyYYSfGPfHd9NlE&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=72JDe7GDoP-o1dh04_dl1w&oh=00_AYEaWHfirM3l0gcY7j87kRuZSBQkprRgR1AVMLSbn1ZXNQ&oe=67E13A8F');
  const [editMode, setEditMode] = useState(null);
  const [userInfo, setUserInfo] = useState({
    email: 'heritieramuritcha@gmail.com',
    phone: '+243 990 691 536',
    address: '048 Dikuta, Kasika, Karisimbi, Goma',
  });
  const [tempValue, setTempValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setSuccessMessage('Photo de profil mise à jour avec succès');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (field) => {
    setEditMode(field);
    setTempValue(userInfo[field]);
    setError('');
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        if (!validateEmail(value)) {
          return 'Format d\'email invalide (exemple@domaine.com)';
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          return 'Format de téléphone invalide (+XXX ou 0X XX XX XX XX)';
        }
        break;
    }
    return '';
  };

  const handleSave = async (field) => {
    const validationError = validateField(field, tempValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUserInfo(prev => ({
        ...prev,
        [field]: tempValue,
      }));
      setEditMode(null);
      setError('');
      setSuccessMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} mis à jour avec succès`);
    } catch (error) {
      console.error('Error updating user info:', error);
      setError('Une erreur est survenue lors de la mise à jour');
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setTempValue('');
    setError('');
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', pb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Mon Compte</Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="start" gap={4} flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
            <Box sx={{ width: { xs: '100%', md: 'auto' }, textAlign: { xs: 'center', md: 'left' } }}>
              <Avatar
                src={profileImage}
                sx={{ 
                  width: 100, 
                  height: 100, 
                  mb: 2,
                  mx: { xs: 'auto', md: 0 }
                }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-upload">
                <Button variant="outlined" component="span">
                  Modifier la photo
                </Button>
              </label>
            </Box>
            
            <Box sx={{ flexGrow: 1, width: { xs: '100%', md: 'auto' } }}>
              <Typography variant="h6" sx={{ mb: 2 }}>AMURI TCHALUMBA Héritier</Typography>
              <Box display="grid" gap={2}>
                {Object.entries(userInfo).map(([field, value]) => (
                  <Box key={field} display="flex" alignItems="center" gap={1} flexDirection={{ xs: 'column', sm: 'row' }} width="100%">
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={editMode === field ? tempValue : value}
                      onChange={(e) => setTempValue(e.target.value)}
                      disabled={editMode !== field}
                      fullWidth
                      multiline={field === 'address'}
                      rows={field === 'address' ? 2 : 1}
                      error={!!error && editMode === field}
                      helperText={editMode === field ? error : ''}
                    />
                    <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
                      {editMode === field ? (
                        <>
                          <IconButton
                            color="primary"
                            onClick={() => handleSave(field)}
                            size="small"
                          >
                            <Check />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={handleCancel}
                            size="small"
                          >
                            <X />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          onClick={() => handleEdit(field)}
                          size="small"
                        >
                          <Edit2 />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ mb: 2 }}>Historique des Voyages</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Départ</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Arrivée</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTrips.map((trip) => (
              <TableRow key={trip.id} hover>
                <TableCell>{trip.date}</TableCell>
                <TableCell>{trip.from}</TableCell>
                <TableCell>{trip.to}</TableCell>
                <TableCell>{trip.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Account;