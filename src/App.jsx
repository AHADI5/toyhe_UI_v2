import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.js';
import ProtectedRoute from "./ProtectedRoute.js";
import Unauthorized from "./compo/AccesNonAutoriser";

import SignUp from './compo/SignUp';
import SignIn from './compo/LoginPage';
import ForgotPasswordPage from './compo/ForgotPasswordPage';
import BodyAuthLayout from './compo/BodyAuthLayout';
import { createContext, useEffect, useState } from 'react';
import SiteLayout from './compo/site.presentation.toyhe/SiteLayout';
import Home from './compo/site.presentation.toyhe/pages/Home';
import Services from './compo/site.presentation.toyhe/pages/Services';
import Payment from './compo/site.presentation.toyhe/pages/Payment';
import Partners from './compo/site.presentation.toyhe/pages/Partners';
import PricingTOYHE from './compo/site.presentation.toyhe/pages/Pricing';
import AppDownload from './compo/site.presentation.toyhe/pages/AppDownload';
import FAQ from './compo/site.presentation.toyhe/pages/FAQ';
import Terms from './compo/site.presentation.toyhe/pages/Terms';
import Privacy from './compo/site.presentation.toyhe/pages/Privacy';

import Messages from './compo/Messages';
import Reservation from './compo/Reservation';
import PerformanceDashboard from './compo/Performances/PerformanceDashboard';
import Schedule from './compo/Schedule';
import Boats from './compo/Boats';
import Pricing from './compo/Pricing';
import Commandes from './compo/Commandes/Commandes';
import ComplaintForm from './compo/ComplaintForm';
import Fonds from './compo/Fonds/Fonds';
import Rapport from './compo/Rapport/Rapport';
import CommandesEnLigne from './compo/Commandes/CommandesEnLigne';
import CommandesParVentes from './compo/Commandes/CommandesParVentes';
import Account from './compo/communs/Account';
import Help from './compo/communs/Help';
import Settings from './compo/communs/parametres/Settings/Settings';
import Accueil from './compo/Accueil';
import Campagnes from './compo/marketing/MarketingCampaignManager';
import UserManagement from './compo/admin/UserManagement';

import './App.css';
import './Responsive.css';

// Création du contexte
const MyContext = createContext();

export default function App() {

  // You can change this to 'personal', 'company', or 'agent' to test different user types
  const userType = 'personal';

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openNav = () => {
    setIsOpenNav(true);
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    activeTab,
    setActiveTab
  };

  return (
    <Router>
      <AuthProvider>
        <MyContext.Provider value={values}>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="payment" element={<Payment />} />
              <Route path="partners" element={<Partners />} />
              <Route path="pricing" element={<PricingTOYHE />} />
              <Route path="app" element={<AppDownload />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="reservation/ets-silimu" element={<Reservation />} />
            </Route>

            {/* Routes d'authentification */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Routes pour utilisateurs authentifiés sous BodyAuthLayout */}
            <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_UTILISATEUR", "ROLE_DAF", "ROLE_DG", "ROLE_CSM", "ROLE_DSG"]} />}>
              <Route path="/user" element={<BodyAuthLayout />}>
                {/* Routes accessibles à tous les utilisateurs authentifiés */}
                <Route index element={<Accueil />} />
                <Route path="messages" element={<Messages />} />
                <Route path="reservation" element={<Reservation />} />
                <Route path="bateaux" element={<Boats />} />
                <Route path="prix" element={<Pricing />} />
                <Route path="horaire" element={<Schedule />} />
                <Route path="compte" element={<Account />} />
                <Route path="parametres" element={<Settings userType={userType} />} />
                <Route path="aide-et-supports" element={<Help />} />

                {/* Routes réservées aux agents de l'agence de transport */}
                <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DAF", "ROLE_DG", "ROLE_CSM", "ROLE_DSG"]} />}>
                  <Route path="fonds" element={<Fonds />} />
                  <Route path="rapports" element={<Rapport />} />
                </Route>

                {/* Routes réservées aux administratifs */}
                <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_DAF", "ROLE_DG", "ROLE_CSM", "ROLE_DSG"]} />}>
                  <Route path="commandes" element={<Commandes />} />
                  <Route path="commandes-en-ligne" element={<CommandesEnLigne />} />
                  <Route path="commandes-par-vente" element={<CommandesParVentes />} />
                  <Route path="performances" element={<PerformanceDashboard />} />
                </Route>

                {/* Routes réservées à l'administrateur et CSP */}
                <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                  <Route path="utilisateurs" element={<UserManagement />} />
                </Route>

                {/* Routes réservées au chargé du service Marketing */}
                <Route element={<ProtectedRoute allowedRoles={["ROLE_CSM"]} />}>
                  <Route path="campagnes" element={<Campagnes />} />
                </Route>

                {/* Routes réservées aux utilisateurs simples */}
                <Route element={<ProtectedRoute allowedRoles={["ROLE_UTILISATEUR"]} />}>
                  <Route path="reclamation" element={<ComplaintForm />} />
                </Route>
              </Route>
            </Route>

            {/* Redirection par défaut */}
            <Route path="*" element={<SignIn />} />
          </Routes>
        </MyContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export { MyContext };
