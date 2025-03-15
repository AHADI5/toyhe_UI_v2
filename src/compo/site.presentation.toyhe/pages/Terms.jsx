import { Container, Typography } from '@mui/material';

function Terms() {
  return (
    <Container maxWidth="lg" className="py-16">
      <Typography variant="h1" className="text-4xl font-bold mb-8">
        Conditions d'utilisation
      </Typography>
      <Typography variant="body1" className="mb-4">
        En utilisant la plateforme TOYHE, vous acceptez les conditions suivantes...
      </Typography>
    </Container>
  );
}

export default Terms;