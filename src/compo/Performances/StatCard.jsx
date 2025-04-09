import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Chart } from 'react-google-charts';

const StatCard = ({ title, value, data, chartType = 'PieChart', chartOptions = {} }) => {
  const defaultOptions = {
    backgroundColor: 'transparent',
    legend: 'none',
    pieHole: 0.7,
    colors: ['#1c75bc', '#2b3990'],
    chartArea: { width: '100%', height: '100%' },
    ...chartOptions
  };

  return (
    <Paper className="p-4 bg-white h-full">
      <Typography variant="subtitle1" className="mb-2 text-[#2b3990]">{title}</Typography>
      <div className="flex items-center justify-between">
        <Typography variant="h4" className="text-[#1c75bc]">{value}</Typography>
        {data && (
          <div className="w-20 h-20">
            <Chart
              chartType={chartType}
              data={data}
              options={defaultOptions}
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>
    </Paper>
  );
};

export default StatCard;