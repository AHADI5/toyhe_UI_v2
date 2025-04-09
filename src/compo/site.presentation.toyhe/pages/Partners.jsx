import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

function Partners() {
  const partners = [
    {
      name: "Ets SILIMU",
      description: "Leader du transport lacustre au Nord-Kivu",
      image: "https://placehold.co/800x400/2b3990/ffffff?text=Ets+SILIMU",
      features: [
        "Plus de 10 ans d'expérience",
        "Flotte moderne et sécurisée",
        "Service client 24/7"
      ]
    },
    {
      name: "Ets BMB Etoile du KIVU",
      description: "Spécialiste des excursions touristiques",
      image: "https://placehold.co/800x400/1c75bc/ffffff?text=Ets+BMB+Etoile+du+KIVU",
      features: [
        "Circuits touristiques personnalisés",
        "Guides professionnels",
        "Expérience unique sur le lac"
      ]
    },
    {
      name: "IHUSI Express",
      description: "Transport rapide et fiable",
      image: "https://placehold.co/800x400/e93e3a/ffffff?text=IHUSI+Express",
      features: [
        "Trajets express quotidiens",
        "Réservation en ligne",
        "Service ponctuel garanti"
      ]
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
            Nos Partenaires
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          {partners.map((partner, index) => (
            <Grid item xs={12} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6">
                    <Typography variant="h5" className="font-bold mb-3">
                      {partner.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" className="mb-4">
                      {partner.description}
                    </Typography>
                    <ul className="list-disc pl-5 space-y-2">
                      {partner.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-gray-700">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Partners