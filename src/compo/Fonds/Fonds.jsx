import React, { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Dashboard from './Dashboard';
import NewRequest from './NewRequest';
import MyRequests from './MyRequests';
import AllRequests from './AllRequests';
import RequestDetails from './RequestDetails';

const Fonds = ({ userRole = 'AGENT' }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSelectedRequest(null);
  };

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
  };

  const getTabs = () => {
    const tabs = [
      { icon: <DashboardIcon />, label: 'Tableau de bord' },
      { icon: <AddIcon />, label: 'Nouvelle demande' },
      { icon: <ListAltIcon />, label: 'Mes demandes' },
    ];

    if (userRole === 'DAF' || userRole === 'DG') {
      tabs.push({ icon: <ListAltIcon />, label: 'Toutes les demandes' });
    }

    return tabs;
  };

  const renderContent = () => {
    const content = selectedRequest ? (
      <Fade in={true}>
        <div>
          <RequestDetails
            request={selectedRequest}
            onBack={handleBackToList}
            userRole={userRole}
          />
        </div>
      </Fade>
    ) : (
      <Fade in={true}>
        <div>
          {(() => {
            switch (currentTab) {
              case 0:
                return <Dashboard userRole={userRole} onSelectRequest={handleRequestSelect} />;
              case 1:
                return <NewRequest />;
              case 2:
                return <MyRequests onSelectRequest={handleRequestSelect} />;
              case 3:
                return userRole === 'DAF' || userRole === 'DG' ? (
                  <AllRequests userRole={userRole} onSelectRequest={handleRequestSelect} />
                ) : null;
              default:
                return <Dashboard userRole={userRole} onSelectRequest={handleRequestSelect} />;
            }
          })()}
        </div>
      </Fade>
    );

    return content;
  };

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      bgcolor: 'background.default',
      p: { xs: 1, sm: 2, md: 3 },
      boxSizing: 'border-box'
    }}>
      <Paper 
        elevation={3}
        sx={{ 
          height: '100%',
          minHeight: 'calc(100vh - 32px)',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            p: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1.5rem', sm: '2rem' },
            borderBottom: 1, 
            borderColor: 'divider',
            color: 'primary.dark'
          }}
        >
          Gestion des Fonds
        </Typography>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            bgcolor: 'background.paper',
            minHeight: { xs: 48, sm: 56 }
          }}
        >
          {getTabs().map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              label={!isMobile ? tab.label : undefined}
              iconPosition="start"
              sx={{
                minHeight: { xs: 48, sm: 56 },
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                '&.Mui-selected': {
                  color: 'primary.main',
                }
              }}
            />
          ))}
        </Tabs>
        <Box sx={{ 
          p: { xs: 1.5, sm: 2, md: 3 },
          flexGrow: 1,
          overflow: 'auto',
          bgcolor: 'background.paper'
        }}>
          {renderContent()}
        </Box>
      </Paper>
    </Box>
  );
};

export default Fonds;