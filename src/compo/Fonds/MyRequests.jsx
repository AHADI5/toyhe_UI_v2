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
      amount: '5000€',
      date: new Date(),
      status: 'pending',
      description: 'Achat de matériel'
    },
    {
      id: '002',
      category: 'Marketing',
      amount: '3000€',
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
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.category}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>
                  {format(request.date, 'dd MMMM yyyy', { locale: fr })}
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