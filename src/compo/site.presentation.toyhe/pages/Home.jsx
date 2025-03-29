import { useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const features = [
  {
    title: 'Réservation simplifiée',
    image: '/assets/bateaux/Bateau.jpg',
    description: 'Interface intuitive pour une gestion facile de vos réservations'
  },
  {
    title: 'Gestion administrative',
    image: '/assets/interfaces/administrationAccueil.png',
    description: 'Suivi des paiements et rapports détaillés en temps réel'
  },
  {
    title: 'Outils de marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    description: 'Campagnes email et promotions pour fidéliser vos clients'
  }
];

const advantages = [
  {
    icon: <MonetizationOnIcon fontSize="large" className="text-[#1c75bc]" />,
    title: 'Augmentez vos revenus',
    description: 'Optimisez vos ventes grâce à notre plateforme'
  },
  {
    icon: <VisibilityIcon fontSize="large" className="text-[#1c75bc]" />,
    title: 'Gagnez en visibilité',
    description: 'Développez votre présence en ligne'
  },
  {
    icon: <AccessTimeIcon fontSize="large" className="text-[#1c75bc]" />,
    title: 'Libérez du temps',
    description: 'Automatisez vos processus de réservation'
  },
  {
    icon: <SupportAgentIcon fontSize="large" className="text-[#1c75bc]" />,
    title: 'Accompagnement personnalisé',
    description: 'Une équipe dédiée à votre réussite'
  }
];

const testimonials = [
  {
    name: 'Jean-Luc K.',
    role: 'Directeur Commercial',
    content: 'TOYHE a révolutionné notre gestion des réservations. Un gain de temps considérable !',
    company: 'Ets SILIMU'
  },
  {
    name: 'Marie T.',
    role: 'Responsable Marketing',
    content: 'Une plateforme intuitive qui nous a permis d\'augmenter nos réservations de 40%.',
    company: 'Ets Etoile du KIVU'
  },
  {
    name: 'Célestin M.',
    role: 'Gérant',
    content: 'Le support client est exceptionnel. Toujours disponible et efficace.',
    company: 'IHUSI Express'
  }
];

function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className='mt-16'>
      {/* Hero Section */}
      <section className="section-ful"
        style={{
          background: 'linear-gradient(to right, #1c75bc, #2b3990)',
          minHeight: '100vh',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h1" className="mb-8 text-5xl font-bold leading-tight">
                  La solution complète pour votre transport lacustre
                </Typography>
                <Typography variant="h2" className="mb-10 text-xl opacity-90">
                  Plateforme de réservation, de marketing et de gestion, leader pour les prestataires de services de transport lacustre
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  className="bg-white hover:text-sky-700 mb-2 text-[#1c75bc] hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg"
                >
                  Demander une démo
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="relative h-[500px] carousel-container">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`carousel-slide ${
                      index === activeFeature 
                        ? 'active'
                        : index === (activeFeature + 1) % features.length
                        ? 'next'
                        : 'prev'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-[500px] object-cover rounded-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                      <Typography variant="h4" className="mb-2 font-bold text-white">
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" className="text-white/90">
                        {feature.description}
                      </Typography>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Features Section */}
      <section className="section-full bg-[#f5f5ff]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" className="mb-16 text-4xl font-bold text-center">
              Simplifiez la gestion de vos réservations
            </Typography>
          </motion.div>
          <Grid container spacing={6}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card 
                    className={`h-full transition-all duration-300 hover:shadow-xl cursor-pointer ${
                      activeFeature === index ? 'border-2 border-[#1c75bc]' : ''
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="aspect-video">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Typography variant="h5" className="mb-3 font-bold">
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Advantages Section */}
      <section className="section-full">
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" className="mb-6 text-4xl font-bold">
                  Pourquoi choisir TOYHE ?
                </Typography>
                <Typography variant="body1" className="mb-8 text-lg text-gray-600">
                  Les réservations sont essentielles, mais leur gestion peut être complexe. 
                  Nous simplifions ce processus avec une solution intelligente et tout-en-un.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={4}>
                {advantages.map((advantage, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <Box className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
                        <div className="mb-4">{advantage.icon}</div>
                        <Typography variant="h6" className="mb-2 font-bold">
                          {advantage.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {advantage.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="section-full bg-[#f5f5ff]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" className="mb-16 text-4xl font-bold text-center">
              Ce que nos clients disent
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <Typography variant="body1" className="mb-6 text-lg italic">
                        "{testimonial.content}"
                      </Typography>
                      <Box>
                        <Typography variant="h6" className="font-bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role} - {testimonial.company}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1c75bc]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box className="text-center text-white">
              <Typography variant="h3" className="mb-6 font-bold">
                Prêt à transformer votre activité ?
              </Typography>
              <Typography variant="h6" className="mb-8 opacity-90">
                Rejoignez les leaders du transport lacustre qui font confiance à TOYHE
              </Typography>
              <Button
                variant="contained"
                size="large"
                className="bg-white text-[#1c75bc] hover:bg-gray-100 hover:text-sky-700 px-8 py-3 text-lg font-semibold"
              >
                Commencer maintenant
              </Button>
            </Box>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default Home;