import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  BookOpen,
  Calendar,
  Clock,
  HelpCircle,
  Key,
  Map,
  Settings,
  User,
} from 'lucide-react';

const helpSections = [
  {
    id: 'getting-started',
    title: 'Premiers pas',
    icon: <BookOpen size={24} />,
    content: `Pour commencer à utiliser LacTrans, suivez ces étapes simples :
    1. Créez votre compte
    2. Complétez votre profil
    3. Explorez les différentes fonctionnalités
    
    Notre plateforme vous permet de gérer facilement vos réservations de transport lacustre.`,
    image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20',
  },
  {
    id: 'booking',
    title: 'Comment réserver un trajet ?',
    icon: <Calendar size={24} />,
    content: `Pour réserver un trajet, suivez ces étapes :
    1. Connectez-vous à votre compte
    2. Cliquez sur "Réserver un trajet"
    3. Sélectionnez votre port de départ
    4. Choisissez votre destination
    5. Sélectionnez la date et l'heure
    6. Vérifiez les détails de votre réservation
    7. Confirmez et payez
    
    Une fois la réservation confirmée, vous recevrez un email avec tous les détails.`,
    image: 'https://images.unsplash.com/photo-1559268950-2d7ceb2efa3a',
  },
  {
    id: 'past-trips',
    title: 'Comment consulter mes trajets passés ?',
    icon: <Clock size={24} />,
    content: `Pour consulter votre historique de trajets :
    1. Accédez à votre compte
    2. Dans la section "Mon Compte"
    3. Faites défiler jusqu'à "Historique des Voyages"
    
    Vous pouvez voir tous vos trajets passés avec les détails complets.`,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
  },
  {
    id: 'profile-management',
    title: 'Comment modifier mes informations personnelles ?',
    icon: <User size={24} />,
    content: `Pour mettre à jour vos informations :
    1. Accédez à "Mon Compte"
    2. Cliquez sur l'icône de modification à côté du champ souhaité
    3. Effectuez vos modifications
    4. Cliquez sur la coche pour sauvegarder
    
    Vous pouvez modifier :
    - Votre photo de profil
    - Votre adresse email
    - Votre numéro de téléphone
    - Votre adresse postale`,
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07',
  },
  {
    id: 'password-reset',
    title: 'Comment réinitialiser mon mot de passe ?',
    icon: <Key size={24} />,
    content: `Pour changer votre mot de passe :
    1. Accédez aux "Paramètres"
    2. Remplissez le formulaire avec :
       - Votre ancien mot de passe
       - Votre nouveau mot de passe
       - Confirmation du nouveau mot de passe
    3. Cliquez sur "Mettre à jour le mot de passe"
    
    En cas d'oubli, utilisez l'option "Mot de passe oublié" sur la page de connexion.`,
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040',
  },
  {
    id: 'faq',
    title: 'Questions fréquentes (FAQ)',
    icon: <HelpCircle size={24} />,
    content: `Questions fréquemment posées :

    Q: Puis-je annuler une réservation ?
    R: Oui, vous pouvez annuler jusqu'à 24h avant le départ.

    Q: Comment puis-je payer ?
    R: Nous acceptons les cartes bancaires et le paiement mobile.

    Q: Que faire en cas de retard ?
    R: Contactez notre service client au plus tôt.

    Q: Y a-t-il des réductions ?
    R: Oui, pour les abonnés et les groupes.`,
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d',
  },
];

function Help() {
  const [selectedSection, setSelectedSection] = useState(helpSections[0]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Aide et Support</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ position: { md: 'sticky' }, top: 24 }}>
            <List component="nav">
              {helpSections.map((section) => (
                <ListItem
                  button
                  key={section.id}
                  selected={selectedSection.id === section.id}
                  onClick={() => setSelectedSection(section)}
                  sx={{
                    borderLeft: selectedSection.id === section.id
                      ? '4px solid'
                      : '4px solid transparent',
                    borderLeftColor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {section.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={section.title}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: selectedSection.id === section.id ? 600 : 400,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
              {selectedSection.title}
            </Typography>
            
            <Box
              component="img"
              src={selectedSection.image}
              alt={selectedSection.title}
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 3,
              }}
            />
            
            <Divider sx={{ my: 3 }} />
            
            <Typography
              component="div"
              sx={{
                whiteSpace: 'pre-line',
                '& p': { mb: 2 },
                lineHeight: 1.8,
              }}
            >
              {selectedSection.content}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Help;