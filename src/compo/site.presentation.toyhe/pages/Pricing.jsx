import { Container, Typography, Grid, Card, CardContent, CardHeader, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Pricing() {
  const plans = [
    {
      title: "Essentiel",
      price: "99",
      features: [
        "Jusqu'à 100 réservations/mois",
        "Interface de réservation simple",
        "Rapports basiques",
        "Support email"
      ]
    },
    {
      title: "Professionnel",
      price: "199",
      features: [
        "Réservations illimitées",
        "Gestion multi-utilisateurs",
        "Rapports avancés",
        "Support prioritaire",
        "Outils marketing inclus"
      ],
      recommended: true
    },
    {
      title: "Entreprise",
      price: "Sur mesure",
      features: [
        "Solution personnalisée",
        "API dédiée",
        "Support 24/7",
        "Formation sur site",
        "Intégrations spécifiques"
      ]
    }
  ];

  return (
    <Container maxWidth="lg" className="py-16">
      <Typography variant="h1" className="text-4xl font-bold text-center mb-4">
        Tarifs simples et transparents
      </Typography>
      <Typography variant="h6" className="text-center text-gray-600 mb-12">
        Choisissez le plan qui correspond à vos besoins
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              className={`h-full ${plan.recommended ? 'border-2 border-primary shadow-lg' : ''}`}
              raised={plan.recommended}
            >
              <CardHeader
                title={plan.title}
                titleTypographyProps={{ align: 'center', variant: 'h5', className: 'font-bold' }}
                className={plan.recommended ? 'bg-primary text-white' : ''}
              />
              <CardContent>
                <div className="text-center mb-6">
                  <Typography variant="h3" component="span" className="font-bold">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </Typography>
                  {typeof plan.price === 'number' && (
                    <Typography variant="subtitle1" color="text.secondary">
                      /mois
                    </Typography>
                  )}
                </div>

                <List>
                  {plan.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} disablePadding className="mb-2">
                      <ListItemIcon className="min-w-[40px]">
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant={plan.recommended ? "contained" : "outlined"}
                  color="primary"
                  size="large"
                  className="mt-6"
                >
                  Choisir ce plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Pricing;