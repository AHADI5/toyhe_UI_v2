import { Container, Typography } from '@mui/material';

function Privacy() {
  return (
    <Container maxWidth="lg" className="py-16">
      <Typography variant="h1" className="text-4xl font-bold mb-8">
        Politique de confidentialité
      </Typography>
      <Typography variant="body1" className="mb-4">
        TOYHE s'engage à protéger vos données personnelles...
      </Typography>
    </Container>
  );
}

export default Privacy;