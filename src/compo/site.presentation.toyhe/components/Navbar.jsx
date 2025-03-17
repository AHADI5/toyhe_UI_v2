import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, Box, Container, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width:780px)'); // Détecter si l'écran est ≥ 780px

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseDrawer = () => {
    if (!isDesktop) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { text: 'Services', path: '/services' },
    { text: 'Paiement', path: '/payment' },
    { text: 'Partenaires', path: '/partners' },
    { text: 'Tarif', path: '/pricing' },
    { text: 'Application', path: '/app' },
  ];

  return (
    <AppBar position="fixed" color="default" elevation={0} className="bg-white">
      <Container maxWidth="xl">
        <Toolbar className="px-0 flex justify-between">
          {/* Logo + Nom de la plateforme */}
          <Link to="/" className="logo no-underline flex items-center gap-1 ml-0">
            <img src="/logo_toyhe_100x100px.png" alt="TOYHE Logo" className="w-12 ml-0" />
            <span className="text-[#2b3990] font-bold text-4xl mt-0 tracking-tighter not-italic">
              TOYHE
            </span>
          </Link>
          
          {/* Menu Desktop (Aligné à droite) */}
          {isDesktop && (
            <Box className="ml-auto flex items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.text}
                </Link>
              ))}
              <Link to="/signin">
                <Button variant="outlined" color="primary" className="button-secondary">
                  Se connecter
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="contained" color="primary" className="button-primary">
                  Créer un compte
                </Button>
              </Link>
            </Box>
          )}

          {/* Bouton Menu Mobile (Toujours à droite) */}
          {!isDesktop && (
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Drawer Mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          className: "w-64"
        }}
      >
        <List className="p-4">
          {menuItems.map((item) => (
            <ListItem key={item.text} className="mb-2">
              <Link to={item.path} className="w-full py-2 px-4 rounded hover:bg-gray-100" onClick={handleCloseDrawer}>
                {item.text}
              </Link>
            </ListItem>
          ))}
          <ListItem className="mt-4">
            <Link to="/signin" className="w-full">
              <Button variant="outlined" color="primary" fullWidth className="mb-2" onClick={handleCloseDrawer}>
                Se connecter
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/signup" className="w-full">
              <Button variant="contained" color="primary" fullWidth onClick={handleCloseDrawer}>
                Créer un compte
              </Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
