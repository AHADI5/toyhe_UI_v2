import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c75bc',
    },
    secondary: {
      main: '#2b3990',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'League Gothic, sans-serif',
    },
    button: {
      textTransform: 'none',
    },
  },
});

function SiteLayout() { 
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-5">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default SiteLayout;