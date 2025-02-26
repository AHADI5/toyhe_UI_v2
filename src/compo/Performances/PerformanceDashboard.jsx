import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import SelectionHeader from './SelectionHeader';
import StatCard from './StatCard';
import TrendChart from './TrendChart';
import ClassStats from './ClassStats';
import ExportButton from './ExportButton';
import { 
  generateOrdersData, 
  generateCargoData, 
  generateOccupancyData,
  generateTrendsData,
  generateClassData
} from './mockData';

const PerformanceDashboard = () => {
  // États pour les filtres
  const [selectedBoat, setSelectedBoat] = useState(1);
  const [period, setPeriod] = useState('month');
  const [periodValue, setPeriodValue] = useState(1);
  const [boatClass, setBoatClass] = useState(0);

  // États pour les données
  const [ordersData, setOrdersData] = useState(generateOrdersData());
  const [cargoData, setCargoData] = useState(generateCargoData());
  const [occupancyData, setOccupancyData] = useState(generateOccupancyData());
  const [trendsData, setTrendsData] = useState(generateTrendsData());
  const [classData, setClassData] = useState(generateClassData());

  // Mise à jour des données lors du changement des filtres
  useEffect(() => {
    setOrdersData(generateOrdersData(period));
    setCargoData(generateCargoData());
    setOccupancyData(generateOccupancyData());
    setTrendsData(generateTrendsData(period));
    setClassData(generateClassData());
  }, [selectedBoat, period, periodValue, boatClass]);

  const exportData = {
    occupancyRate: Math.round((occupancyData.occupied / (occupancyData.occupied + occupancyData.available)) * 100),
    onlineOrders: ordersData.onlineOrders,
    directSales: ordersData.directSales,
    totalRevenue: ordersData.revenue.online + ordersData.revenue.direct,
  };

  return (
    <Container maxWidth="xl" className="py-4">
      <Box className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#2b3990]">
          Perfomances de l'agence
        </h1>
        <ExportButton data={exportData} />
      </Box>

      <SelectionHeader
        selectedBoat={selectedBoat}
        setSelectedBoat={setSelectedBoat}
        period={period}
        setPeriod={setPeriod}
        periodValue={periodValue}
        setPeriodValue={setPeriodValue}
        boatClass={boatClass}
        setBoatClass={setBoatClass}
      />

      <ClassStats
        occupancyData={classData.occupancy}
        revenueData={classData.revenue}
      />

      {/* Deuxième partie : Commandes et ventes */}
      <Grid container spacing={3} className="my-6">
        <Grid item xs={12} md={3}>
          <StatCard
            title="Commandes en ligne vs. Directes"
            value={`${ordersData.onlineOrders + ordersData.directSales}`}
            data={[
              ['Type', 'Commandes'],
              ['En ligne', ordersData.onlineOrders],
              ['Directes', ordersData.directSales]
            ]}
            chartOptions={{ colors: ['#e93e3a', '#1c75bc'] }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Recettes par type"
            value={`${(ordersData.revenue.online + ordersData.revenue.direct).toLocaleString()}€`}
            data={[
              ['Source', 'Montant'],
              ['En ligne', ordersData.revenue.online],
              ['Direct', ordersData.revenue.direct]
            ]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Dépenses commandes"
            value={`${(ordersData.expenses.partner + ordersData.expenses.agent).toLocaleString()}€`}
            data={[
              ['Type', 'Montant'],
              ['Partenaires', ordersData.expenses.partner],
              ['Agents', ordersData.expenses.agent]
            ]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Dépenses totales"
            value={`${Object.values(ordersData.expenses).reduce((a, b) => a + b, 0).toLocaleString()}€`}
            data={[
              ['Type', 'Montant'],
              ['Commandes', ordersData.expenses.partner + ordersData.expenses.agent],
              ['Opérations', ordersData.expenses.fuel + ordersData.expenses.maintenance + ordersData.expenses.staff]
            ]}
          />
        </Grid>
      </Grid>

      {/* Troisième partie : Cargaisons et revenus */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={3}>
          <StatCard
            title="Poids cargaison"
            value={`${cargoData.totalWeight.toLocaleString()}kg`}
            data={[
              ['Type', 'Poids'],
              ['Standard', cargoData.distribution.regular],
              ['Vrac', cargoData.distribution.bulk]
            ]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Recettes cargaison"
            value={`${cargoData.revenue.toLocaleString()}€`}
            data={[
              ['Type', 'Montant'],
              ['Standard', cargoData.distribution.regular * 2],
              ['Vrac', cargoData.distribution.bulk * 1.5]
            ]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Recettes globales"
            value={`${(cargoData.revenue + ordersData.revenue.online + ordersData.revenue.direct).toLocaleString()}€`}
            data={[
              ['Source', 'Montant'],
              ['Billetterie', ordersData.revenue.online + ordersData.revenue.direct],
              ['Cargaison', cargoData.revenue]
            ]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Dépenses globales"
            value={`${Object.values(ordersData.expenses).reduce((a, b) => a + b, 0).toLocaleString()}€`}
            chartType="ColumnChart"
            data={[
              ['Type', 'Montant', { role: 'style' }],
              ['Carburant', ordersData.expenses.fuel, '#1c75bc'],
              ['Maintenance', ordersData.expenses.maintenance, '#2b3990'],
              ['Personnel', ordersData.expenses.staff, '#e93e3a']
            ]}
          />
        </Grid>
      </Grid>

      {/* Quatrième partie : Graphiques de tendances */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TrendChart
            title="Évolution des commandes"
            data={[
              ['Période', 'En ligne', 'Directes'],
              ...trendsData.map(data => [
                data.time,
                data.online,
                data.direct
              ])
            ]}
            options={{
              colors: ['#e93e3a', '#1c75bc']
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrendChart
            title="Évolution commandes partenaires/agents"
            data={[
              ['Période', 'Partenaires', 'Agents'],
              ...trendsData.map(data => [
                data.time,
                data.partner,
                data.agent
              ])
            ]}
            options={{
              colors: ['#e93e3a', '#1c75bc']
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PerformanceDashboard;