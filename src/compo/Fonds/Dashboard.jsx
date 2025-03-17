import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';

const Dashboard = ({ userRole, onSelectRequest }) => {
  // Données simulées pour le tableau de bord
  const stats = {
    totalRequests: 12,
    pendingRequests: 5,
    approvedRequests: 4,
    rejectedRequests: 3,
    totalAmount: '25000$',
    approvedAmount: '15000$'
  };

  const StatCard = ({ title, value, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Tableau de Bord
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Demandes Totales"
            value={stats.totalRequests}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Demandes en Attente"
            value={stats.pendingRequests}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Demandes Approuvées"
            value={stats.approvedRequests}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Progression des Demandes
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography color="textSecondary" variant="body2">
                Taux d'approbation
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(stats.approvedRequests / stats.totalRequests) * 100}
                sx={{ mt: 1, mb: 1 }}
              />
              <Typography variant="body2">
                {Math.round((stats.approvedRequests / stats.totalRequests) * 100)}%
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;