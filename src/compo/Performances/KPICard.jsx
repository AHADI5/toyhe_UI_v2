import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const KPICard = ({ title, value, subtitle, icon }) => {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          {icon && <span className="text-blue-500 mr-2">{icon}</span>}
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </div>
        <Typography variant="h4" className="mb-2">
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;