import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion';

function Payment() {
  const paymentMethods = [
    {
      category: "Mobile Money",
      providers: [
        { 
          name: "Airtel Money", 
          logo: "/assets/cannaux.de.paiement/Airtel_Money.png",
          description: "Transfert d'argent rapide et sécurisé via Airtel"
        },
        { 
          name: "M-Pesa", 
          logo: "/assets/cannaux.de.paiement/M_Pesa.png",
          description: "Solution de paiement mobile leader en Afrique"
        },
        { 
          name: "Orange Money", 
          logo: "/assets/cannaux.de.paiement/Orange_Money.jpg",
          description: "Service de paiement mobile par Orange"
        },
        { 
          name: "MaxiCash", 
          logo: "/assets/cannaux.de.paiement/MaxiCash.jpg",
          description: "Paiement mobile simple et accessible"
        }
      ]
    },
    {
      category: "Cartes Bancaires",
      providers: [
        { 
          name: "PPLE Mobile", 
          logo: "/assets/cannaux.de.paiement/PPLE_Mobile.png",
          description: "Paiements sécurisés avec votre compte PPLE Mobile"
        },
        { 
          name: "PayPal", 
          logo: "/assets/cannaux.de.paiement/PayPal.png",
          description: "Paiements sécurisés avec votre compte PayPal"
        },
        { 
          name: "MasterCard", 
          logo: "/assets/cannaux.de.paiement/VISA_MasterCard.jpg",
          description: "Acceptez les paiements par carte MasterCard"
        }
      ]
    },
    {
      category: "Banques Partenaires",
      providers: [
        { 
          name: "Equity BCDC", 
          logo: "/assets/cannaux.de.paiement/Equity_BCDC.png",
          description: "Services bancaires complets avec Equity BCDC"
        },
        { 
          name: "SMICO", 
          logo: "/assets/cannaux.de.paiement/SMICO.png",
          description: "Services bancaires complets avec Equity BCDC"
        },
        { 
          name: "Rawbank", 
          logo: "/assets/cannaux.de.paiement/RawBank.png",
          description: "Solutions bancaires professionnelles avec Rawbank"
        }
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
            Moyens de Paiement
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          {paymentMethods.map((method, index) => (
            <Grid item xs={12} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <Typography variant="h5" className="font-bold mb-6 text-center">
                      {method.category}
                    </Typography>
                    <Grid container spacing={4}>
                      {method.providers.map((provider, providerIndex) => (
                        <Grid item xs={12} sm={6} md={3} key={providerIndex}>
                          <Box className="text-center">
                            <img 
                              src={provider.logo} 
                              alt={provider.name}
                              className="w-full h-[120px] rounded-lg shadow-md mb-4"
                            />
                            <Typography variant="h6" className="font-bold mb-2">
                              {provider.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {provider.description}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
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

export default Payment