import './App.css'
import './Responsive.css'
import { Route , Routes } from "react-router-dom"
import SignUp from './compo/SignUp'
import SignIn from './compo/LoginPage'
import ForgotPasswordPage from './compo/ForgotPasswordPage'
import BodyAuthLayout from './compo/BodyAuthLayout'
import Dashboard from './compo/Dashboard'
import Utilisateur from './compo/Utilisateurs'
import { createContext, useEffect, useState } from 'react'


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
        <Route path="/signup"  element = {<SignUp/>} />
        <Route path="/signin"  element = {<SignIn/>} />
        <Route path="/forgot-password"  element = {<ForgotPasswordPage/>} />

        {/* Route parent pour un utilisateur authantifié */}
        <Route path="/user" element={<BodyAuthLayout />}>
            <Route index element={<Dashboard />} />
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