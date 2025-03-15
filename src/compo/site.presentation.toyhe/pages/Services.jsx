import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CampaignIcon from '@mui/icons-material/Campaign';

function Services() {
  const services = [
    {
      title: 'Réservation simplifiée',
      icon: <CalendarTodayIcon fontSize="large" />,
      image: "/assets/interfaces/reservations.png",
      features: [
        'Interface intuitive pour une prise en main rapide',
        'Gestion des disponibilités en temps réel',
        'Confirmation instantanée par SMS/email',
        'Historique complet des réservations'
      ],
      description: "Notre système de réservation intelligent vous permet de gérer efficacement vos réservations. L'interface intuitive facilite la prise en main, tandis que la gestion en temps réel des disponibilités évite les doubles réservations."
    },
    {
      title: 'Gestion administrative',
      icon: <AccountBalanceWalletIcon fontSize="large" />,
      image: "/assets/interfaces/administration.png",
      features: [
        'Tableau de bord personnalisable',
        'Rapports détaillés et exports',
        'Gestion des paiements intégrée',
        'Suivi financier en temps réel'
      ],
      description: "Simplifiez votre gestion administrative grâce à notre suite d'outils complets. Du suivi des paiements aux rapports détaillés, tout est centralisé pour vous faire gagner du temps."
    },
    {
      title: 'Outils de marketing',
      icon: <CampaignIcon fontSize="large" />,
      image: "/assets/interfaces/marketing.png",
      features: [
        'Campagnes email personnalisées',
        'Gestion des promotions',
        'Programme de fidélité intégré',
        'Analyses et statistiques'
      ],
      description: "Développez votre activité avec nos outils marketing puissants. Créez des campagnes ciblées, gérez vos promotions et fidélisez votre clientèle grâce à nos fonctionnalités avancées."
    }
  ];

  return (
    <div className="py-16">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h1" className="text-4xl font-bold text-center mb-12">
            Nos Services
          </Typography>
        </motion.div>

        <Grid container spacing={8}>
          {services.map((service, index) => (
            <Grid item xs={12} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden">
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CardContent className="p-6">
                        <Box className="text-[#1c75bc] mb-4">
                          {service.icon}
                        </Box>
                        <Typography variant="h5" className="font-bold mb-4">
                          {service.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className="mb-6">
                          {service.description}
                        </Typography>
                        <ul className="space-y-3">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-[#1c75bc] rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Services