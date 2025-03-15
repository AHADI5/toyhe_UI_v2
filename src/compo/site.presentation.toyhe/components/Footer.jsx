import { Container, Grid, Typography, Link, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { text: 'Services', path: '/services' },
        { text: 'Paiement', path: '/payment' },
        { text: 'Partenaires', path: '/partners' },
        { text: 'Tarif', path: '/pricing' },
        { text: 'Application', path: '/app' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { text: 'Conditions d\'utilisation', path: '/terms' },
        { text: 'Politique de confidentialité', path: '/privacy' },
        { text: 'FAQ', path: '/faq' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box className="mb-6">
              <Typography variant="h6" className="brand-title text-3xl mb-4">
                TOYHE
              </Typography>
              <Typography variant="body2" className="mb-4 text-gray-300">
                Leader des solutions de réservation pour le transport lacustre
              </Typography>
              <Box className="flex gap-2">
                <IconButton color="inherit" aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Typography variant="h6" className="font-bold mb-4">
                {section.title}
              </Typography>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <RouterLink 
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.text}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Box className="border-t border-gray-700 mt-12 pt-8 text-center">
          <Typography variant="body2" className="text-gray-300">
            © 2024 TOYHE. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;