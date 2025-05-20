import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';

function Settings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une lettre majuscule');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une lettre minuscule');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword === oldPassword) {
      setError('Le nouveau mot de passe ne peut pas être identique à l\'ancien');
      return;
    }

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('\n'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      setError('Une erreur est survenue lors de la mise à jour du mot de passe');
    }
  };

  const renderPasswordField = (
    label,
    value,
    onChange,
    showPassword,
    setShowPassword,
    helperText
  ) => (
    <TextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      fullWidth
      variant="outlined"
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              size="large"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Paramètres</Typography>
      
      <Paper elevation={3}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>Changer le mot de passe</Typography>
            
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap={3}
                maxWidth={500}
                sx={{ margin: '0 auto' }}
              >
                {renderPasswordField(
                  'Ancien mot de passe',
                  oldPassword,
                  setOldPassword,
                  showOldPassword,
                  setShowOldPassword
                )}
                
                {renderPasswordField(
                  'Nouveau mot de passe',
                  newPassword,
                  setNewPassword,
                  showNewPassword,
                  setShowNewPassword,
                  'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (!@#$%^&*)'
                )}
                
                {renderPasswordField(
                  'Confirmer le nouveau mot de passe',
                  confirmPassword,
                  setConfirmPassword,
                  showConfirmPassword,
                  setShowConfirmPassword
                )}
                
                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mt: 2,
                      '& .MuiAlert-message': {
                        whiteSpace: 'pre-line'
                      }
                    }}
                  >
                    {error}
                  </Alert>
                )}
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Mettre à jour le mot de passe
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Mot de passe mis à jour avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Settings;