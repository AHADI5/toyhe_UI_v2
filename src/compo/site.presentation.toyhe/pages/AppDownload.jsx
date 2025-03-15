import { Container, Typography, Grid, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

function AppDownload() {
  const features = [
    {
      icon: <PhoneAndroidIcon fontSize="large" />,
      title: "Application Mobile",
      description: "Gérez vos réservations depuis votre smartphone"
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "Sécurisé",
      description: "Transactions sécurisées et données protégées"
    },
    {
      icon: <SpeedIcon fontSize="large" />,
      title: "Rapide",
      description: "Interface optimisée pour une utilisation fluide"
    }
  ];

  const screenshots = [
    {
      image: "https://placehold.co/300x600/1c75bc/ffffff?text=Interface+Accueil",
      title: "Écran d'accueil"
    },
    {
      image: "https://placehold.co/300x600/2b3990/ffffff?text=Interface+Réservation",
      title: "Réservation"
    },
    {
      image: "https://placehold.co/300x600/e93e3a/ffffff?text=Interface+Paiement",
      title: "Paiement"
    }
  ];

  return (
    <div className="py-16">
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h1" className="text-4xl font-bold mb-6">
                Application Mobile TOYHE
              </Typography>
              <Typography variant="body1" className="text-lg text-gray-600 mb-8">
                Téléchargez notre application mobile pour gérer vos réservations en toute simplicité.
              </Typography>
              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <Box className="flex items-start p-6 bg-white rounded-lg shadow-md">
                      <Box className="text-primary mr-4">
                        {feature.icon}
                      </Box>
                      <div>
                        <Typography variant="h6" className="font-bold mb-2">
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </div>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={4}>
                {screenshots.map((screenshot, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box className="text-center">
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        className="w-full h-auto rounded-lg shadow-lg mb-3"
                      />
                      <Typography variant="subtitle1" className="font-medium">
                        {screenshot.title}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          <Grid item xs={12} className="text-center mt-12">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="button-primary px-8 py-3"
            >
              Télécharger l'application
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AppDownload