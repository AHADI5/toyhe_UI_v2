import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import RapportForm from './RapportForm';
import RapportList from './RapportList';
import RapportDetail from './RapportDetail';
import { colors } from '../../theme/colors';

const Rapport = ({ isAdmin = false}) => { // Changé à true pour montrer l'interface DG par défaut
  const [selectedRapport, setSelectedRapport] = useState(null);
  const [rapports, setRapports] = useState([
    // Données de test - À remplacer par les données de l'API
    {
      id: 1,
      titre: "Rapport mensuel - Janvier 2024",
      description: "Résumé des activités du mois de janvier incluant les objectifs atteints, les défis rencontrés et les perspectives pour le mois suivant. L'équipe a réussi à finaliser le projet Alpha avec deux semaines d'avance sur le calendrier prévu. Nous avons également commencé l'analyse préliminaire pour le projet Beta qui débutera officiellement en février.",
      date: "2024-01-31",
      status: "En attente",
      agent: "Jean Dupont",
      fichiers: [
        { nom: "rapport-jan-2024.pdf", url: "#" },
        { nom: "annexe-1.pdf", url: "#" },
        { nom: "statistiques.xlsx", url: "#" }
      ]
    },
    {
      id: 2,
      titre: "Rapport trimestriel - Q4 2023",
      description: "Bilan complet du dernier trimestre 2023 avec analyse des performances et recommandations pour le premier trimestre 2024.",
      date: "2023-12-15",
      status: "Validé",
      agent: "Marie Martin",
      fichiers: [
        { nom: "bilan-q4-2023.pdf", url: "#" },
        { nom: "graphiques-performance.png", url: "#" }
      ]
    },
    {
      id: 3,
      titre: "Rapport d'incident - Système informatique",
      description: "Rapport détaillé sur l'incident survenu le 5 février concernant la panne du serveur principal et les mesures prises pour résoudre le problème.",
      date: "2024-02-06",
      status: "Refusé",
      agent: "Thomas Bernard",
      fichiers: [
        { nom: "incident-05-02-2024.pdf", url: "#" },
        { nom: "logs-serveur.txt", url: "#" },
        { nom: "plan-action.docx", url: "#" }
      ]
    },
    {
      id: 4,
      titre: "Rapport de mission - Conférence Paris",
      description: "Compte-rendu de la participation à la conférence internationale sur l'innovation qui s'est tenue à Paris du 10 au 12 février 2024.",
      date: "2024-02-14",
      status: "En attente",
      agent: "Sophie Dubois",
      fichiers: [
        { nom: "compte-rendu-conference.pdf", url: "#" },
        { nom: "presentation.pptx", url: "#" },
        { nom: "contacts-partenaires.xlsx", url: "#" },
        { nom: "photo-equipe.jpg", url: "#" }
      ]
    }
  ]);

  const theme = useTheme();

  const handleSubmit = async (formData) => {
    // Simulation d'ajout d'un nouveau rapport
    const newRapport = {
      id: rapports.length + 1,
      titre: formData.get('titre'),
      description: formData.get('description'),
      date: new Date().toISOString().split('T')[0],
      status: "En attente",
      agent: "Utilisateur actuel",
      fichiers: Array.from(formData.getAll('fichiers')).map(file => ({
        nom: file.name,
        url: "#" // Dans une vraie application, ce serait l'URL du fichier téléversé
      }))
    };
    
    setRapports([newRapport, ...rapports]);
    
    // Afficher un message de confirmation (dans une vraie application)
    console.log('Nouveau rapport ajouté:', newRapport);
  };

  const handleViewRapport = (rapport) => {
    setSelectedRapport(rapport);
  };

  const handleCloseDetail = () => {
    setSelectedRapport(null);
  };

  const handleValidateRapport = async (rapportId) => {
    // Logique de validation à implémenter
    setRapports(rapports.map(rapport =>
      rapport.id === rapportId ? { ...rapport, status: 'Validé' } : rapport
    ));
    setSelectedRapport(null);
  };

  const handleRejectRapport = async (rapportId) => {
    // Logique de rejet à implémenter
    setRapports(rapports.map(rapport =>
      rapport.id === rapportId ? { ...rapport, status: 'Refusé' } : rapport
    ));
    setSelectedRapport(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          color: colors.secondary,
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        {isAdmin ? "Gestion des Rapports" : "Mes Rapports"}
      </Typography>

      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        minHeight: 'calc(100vh - 200px)'
      }}>
        {!isAdmin && (
          <Box sx={{ 
            flex: '0 0 400px',
            width: { xs: '100%', md: '400px' }
          }}>
            <RapportForm onSubmit={handleSubmit} />
          </Box>
        )}

        <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: '#fff' }}>
          <RapportList
            rapports={rapports}
            onViewRapport={handleViewRapport}
            isAdmin={isAdmin}
          />
        </Box>
      </Box>

      <RapportDetail
        rapport={selectedRapport}
        open={!!selectedRapport}
        onClose={handleCloseDetail}
        onValidate={handleValidateRapport}
        onReject={handleRejectRapport}
        isAdmin={isAdmin}
        sx={{ backgroundColor: '#fff' }}
      />
    </Container>
  );
};

export default Rapport;