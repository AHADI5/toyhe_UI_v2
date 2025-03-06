import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Chart } from 'react-google-charts';

const TrendChart = ({ title, data, options = {} }) => {
  const defaultOptions = {
    backgroundColor: 'transparent',
    chartArea: { width: '90%', height: '80%' },
    colors: ['#1c75bc', '#2b3990', '#e93e3a', '#fff33b'],
    legend: { position: 'top' },
    hAxis: {
      gridlines: { color: '#f5f5f5' },
    },
    vAxis: {
      gridlines: { color: '#f5f5f5' },
    },
    ...options
  };

  return (
    <Paper className="p-4 bg-white h-full">
      <Typography variant="h6" className="mb-4 text-[#2b3990]">{title}</Typography>
      <Chart
        chartType="LineChart"
        data={data}
        options={defaultOptions}
        width="100%"
        height="300px"
      />
    </Paper>
  );
};

export default TrendChart;