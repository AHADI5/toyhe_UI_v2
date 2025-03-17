import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MyRequests = ({ onSelectRequest }) => {
  // Données simulées
  const requests = [
    {
      id: '001',
      category: 'Exploitation',
      amount: '5000$',
      date: new Date(),
      status: 'pending',
      description: 'Achat de matériel'
    },
    {
      id: '123',
      status: 'pending',
      category: 'Exploitation',
      amount: '5000$',
      date: '2025-03-16',
      requester: 'John Doe',
      description: 'Demande de fonds pour exploitation.',
      fileUrl: 'https://www.emse.fr/~picard/cours/1A/java/livretJava.pdf' 
    },
    {
      id: '124',
      status: 'approved',
      category: 'Marketing',
      amount: '1000$',
      date: '2025-03-14',
      requester: 'Jane Doe',
      description: 'Demande de fonds pour marketing.',
      fileUrl: 'https://img.freepik.com/vecteurs-libre/modele-logo-concessionnaire-automobile-degrade_23-2149334632.jpg?ga=GA1.1.749899718.1734765238&semt=ais_hybrid'
    },
    {
      id: '002',
      category: 'Marketing',
      amount: '300$',
      date: new Date(),
      status: 'approved',
      description: 'Campagne publicitaire'
    }
  ];

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { label: 'En attente', color: 'warning' },
      approved: { label: 'Approuvée', color: 'success' },
      rejected: { label: 'Refusée', color: 'error' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Chip
        label={config.label}
        color={config.color}
        size="small"
      />
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Mes Demandes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1c75bc' }}>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Catégorie</TableCell>
              <TableCell sx={{ color: 'white' }}>Montant</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Statut</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.category}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>
                {format(new Date(request.date), 'dd MMMM yyyy', { locale: fr })}
                </TableCell>
                <TableCell>{getStatusChip(request.status)}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => onSelectRequest(request)}
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyRequests;
