
import { Route , Routes } from "react-router-dom"
import SignUp from './compo/SignUp'
import SignIn from './compo/LoginPage'
import ForgotPasswordPage from './compo/ForgotPasswordPage'
import BodyAuthLayout from './compo/BodyAuthLayout'
import Utilisateur from './compo/Utilisateurs'
import { createContext, useEffect, useState } from 'react'

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
import ComplaintForm from './compo/ComplaintForm'
import Fonds from './compo/Fonds/Fonds'
import Rapport from './compo/Rapport/Rapport'
import CommandesEnLigne from './compo/Commandes/CommandesEnLigne';
import CommandesParVentes from './compo/Commandes/CommandesParVentes';
import Account from './compo/communs/Account';
import Help from './compo/communs/Help';
import Settings from './compo/communs/Settings';
import Accueil from './compo/Accueil'

import './App.css'
import './Responsive.css'


const MyContext = createContext();

export default function App() {

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
   
  useEffect( () => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openNav = () => {
    setIsOpenNav(true);
  }



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
  }

  return (
    <MyContext.Provider value={values}>

      <Routes>
        
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
        </Route>

        <Route path="/signup"  element = {<SignUp/>} />
        <Route path="/signin"  element = {<SignIn/>} />
        <Route path="/forgot-password"  element = {<ForgotPasswordPage/>} />

        {/* Route parent pour un utilisateur authantifié */}
        <Route path="/user" element={<BodyAuthLayout />}>
            <Route index element={<Accueil />} />
            <Route path="utilisateurs" element={<Utilisateur />} />
            <Route path="messages" element={<Messages />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="performances" element={<PerformanceDashboard />} />
            <Route path="bateaux" element={<Boats />} />
            <Route path="prix" element={<Pricing />} />
            <Route path="horaire" element={<Schedule />} />

            <Route path="commandes" element={<Commandes />} />
            <Route path="commandes-en-ligne" element={<CommandesEnLigne />} />
            <Route path="commandes-par-vente" element={<CommandesParVentes />} />

            <Route path="reclamation" element={<ComplaintForm />} />
            <Route path="fonds" element={<Fonds />} />
            <Route path="rapports" element={<Rapport />} />

            <Route path="compte" element={<Account />} />
            <Route path="parametres" element={<Settings />} />
            <Route path="aide-et-supports" element={<Help />} />

        </Route>

        {/* Redirection par défaut */}
        <Route path="*" element={<SignIn />} />
      </Routes>

    </MyContext.Provider>


    
  )
  
}

export {MyContext};