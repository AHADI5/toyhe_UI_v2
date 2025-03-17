import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Chip,
  TextField,
  Divider,
  Card,
  CardContent,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RequestDetails = ({ request, onBack, userRole }) => {
  const [comment, setComment] = React.useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleApprove = () => {
    console.log('Approving request with comment:', comment);
    // Logique d'approbation
  };

  const handleReject = () => {
    console.log('Rejecting request with comment:', comment);
    // Logique de rejet
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'primary';
      case 'rejected':
        return 'secondary';
      default:
        return 'warning';
    }
  };

  const handleDownloadFile = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop(); // Utiliser le nom du fichier pour le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderFileAttachment = () => {
    if (request?.fileUrl) {
      const fileExtension = request.fileUrl.split('.').pop().toLowerCase();
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="primary.dark">
            Fichier associé
          </Typography>
          {fileExtension === 'pdf' ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleDownloadFile(request.fileUrl)} // Télécharger le PDF
              sx={{ mt: 1 }}
            >
              Télécharger le PDF
            </Button>
          ) : (
            <Box sx={{ mt: 1 }}>
              <img
                src={request.fileUrl}
                alt="Attachment"
                style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleDownloadFile(request.fileUrl)} // Télécharger l'image
                sx={{ mt: 2 }}
              >
                Télécharger l'image
              </Button>
            </Box>
          )}
        </Box>
      );
    }
    return null;
  };

  return (
    <Fade in={true}>
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ 
            mb: 2, 
            color: 'primary.dark',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Retour</Typography>
        </Button>
        <Card sx={{ bgcolor: 'background.paper' }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box display="flex" 
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between" 
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  gap={2}
                >
                  <Typography variant="h5" color="primary.dark">
                    Demande #{request?.id || '001'}
                  </Typography>
                  <Chip
                    label={request?.status || 'En attente'}
                    color={getStatusColor(request?.status)}
                    sx={{
                      '& .MuiChip-label': {
                        color: request?.status === 'pending' ? 'text.primary' : 'white'
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="primary.dark" gutterBottom>
                  Détails de la demande
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography><strong>Catégorie:</strong> {request?.category || 'Exploitation'}</Typography>
                  <Typography><strong>Montant:</strong> {request?.amount || '5000$'}</Typography>
                  <Typography>
                    <strong>Date:</strong> {request?.date ? new Date(request.date).toLocaleDateString('fr-FR') : '01/03/2024'}
                  </Typography>
                  <Typography><strong>Demandeur:</strong> {request?.requester || 'John Doe'}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="primary.dark" gutterBottom>
                  Description
                </Typography>
                <Typography>
                  {request?.description || 'Description de la demande...'}
                </Typography>
              </Grid>
              {renderFileAttachment()}
              {userRole === 'DAF' && request?.status === 'pending' && (
                <Grid item xs={12}>
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Commentaire"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Box 
                      display="flex" 
                      flexDirection={{ xs: 'column', sm: 'row' }}
                      gap={2}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApprove}
                        fullWidth={isMobile}
                        sx={{ flex: { sm: 1 } }}
                      >
                        Approuver
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleReject}
                        fullWidth={isMobile}
                        sx={{ flex: { sm: 1 } }}
                      >
                        Refuser
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default RequestDetails;
