import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AllRequests = ({ userRole, onSelectRequest }) => {
  const [filter, setFilter] = React.useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Données simulées
  const requests = [
    {
      id: '001',
      requester: 'John Doe',
      category: 'Exploitation',
      amount: '5000€',
      date: new Date(),
      status: 'pending',
      description: 'Achat de matériel'
    },
    {
      id: '002',
      requester: 'Jane Smith',
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
      approved: { label: 'Approuvée', color: 'primary' },
      rejected: { label: 'Refusée', color: 'secondary' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Chip
        label={config.label}
        color={config.color}
        size="small"
        sx={{
          '& .MuiChip-label': {
            color: status === 'pending' ? 'text.primary' : 'white'
          }
        }}
      />
    );
  };

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(request => request.status === filter);

  const renderMobileView = () => (
    <Box sx={{ mt: 2 }}>
      {filteredRequests.map((request) => (
        <Card key={request.id} sx={{ mb: 2, bgcolor: 'background.default' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1">#{request.id}</Typography>
              {getStatusChip(request.status)}
            </Box>
            <Typography><strong>Demandeur:</strong> {request.requester}</Typography>
            <Typography><strong>Catégorie:</strong> {request.category}</Typography>
            <Typography><strong>Montant:</strong> {request.amount}</Typography>
            <Typography><strong>Date:</strong> {format(request.date, 'dd/MM/yyyy', { locale: fr })}</Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                size="small"
                onClick={() => onSelectRequest(request)}
                color="primary"
              >
                <VisibilityIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderDesktopView = () => (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Demandeur</TableCell>
            <TableCell>Catégorie</TableCell>
            <TableCell>Montant</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.requester}</TableCell>
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
  );

  return (
    <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          mb: 3 
        }}>
          <Typography variant="h5" color="primary.dark">
            Toutes les Demandes
          </Typography>
          <TextField
            select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
            sx={{ width: { xs: '100%', sm: 200 } }}
          >
            <MenuItem value="all">Toutes</MenuItem>
            <MenuItem value="pending">En attente</MenuItem>
            <MenuItem value="approved">Approuvées</MenuItem>
            <MenuItem value="rejected">Refusées</MenuItem>
          </TextField>
        </Box>
        {isMobile ? renderMobileView() : renderDesktopView()}
      </CardContent>
    </Card>
  );
};

export default AllRequests;