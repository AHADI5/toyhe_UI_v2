import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { Chart } from 'react-google-charts';

const ClassStats = ({ occupancyData = {}, revenueData = {} }) => {
  // Valeurs par défaut pour éviter les erreurs
  const defaultOccupancy = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
  };

  const defaultRevenue = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
  };

  // Fusion des données avec les valeurs par défaut
  const safeOccupancyData = { ...defaultOccupancy, ...occupancyData };
  const safeRevenueData = { ...defaultRevenue, ...revenueData };

  const occupancyChartData = [
    ['Classe', 'Places'],
    ['Première', safeOccupancyData.first],
    ['Deuxième', safeOccupancyData.second],
    ['Troisième', safeOccupancyData.third],
    ['Quatrième', safeOccupancyData.fourth],
  ];

  const revenueChartData = [
    ['Classe', 'Revenus', { role: 'style' }],
    ['Première', safeRevenueData.first, '#1c75bc'],
    ['Deuxième', safeRevenueData.second, '#2b3990'],
    ['Troisième', safeRevenueData.third, '#e93e3a'],
    ['Quatrième', safeRevenueData.fourth, '#fff33b'],
  ];

  return (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} md={6}>
        <Paper className="p-4 bg-white h-full">
          <Typography variant="h6" className="mb-4 text-[#2b3990]">
            Occupation par classe
          </Typography>
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <table className="w-full">
                <tbody>
                  {occupancyChartData.slice(1).map(([classe, places]) => (
                    <tr key={classe}>
                      <td className="py-1 text-gray-700">{classe}</td>
                      <td className="text-right font-semibold text-[#1c75bc]">{places}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-1/2">
              <Chart
                chartType="PieChart"
                data={occupancyChartData}
                options={{
                  pieHole: 0.7,
                  colors: ['#1c75bc', '#2b3990', '#e93e3a', '#fff33b'],
                  legend: 'none',
                  backgroundColor: 'transparent',
                }}
                width="100%"
                height="200px"
              />
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className="p-4 bg-white h-full">
          <Typography variant="h6" className="mb-4 text-[#2b3990]">
            Recettes par classe
          </Typography>
          <Chart
            chartType="ColumnChart"
            data={revenueChartData}
            options={{
              legend: 'none',
              backgroundColor: 'transparent',
              vAxis: {
                format: 'currency',
                gridlines: { color: '#f5f5f5' },
              },
              animation: {
                startup: true,
                duration: 1000,
                easing: 'out',
              },
            }}
            width="100%"
            height="200px"
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ClassStats;