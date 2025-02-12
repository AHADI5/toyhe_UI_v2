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

import UserManagement from './compo/UserManagement';




const MyContext = createContext();

export default function App() {

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  
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
    setIsHideSidebarAndHeader
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
            <Route path="users" element={<UserManagement />} />
            <Route path="utilisateurs" element={<Utilisateur />} />
        </Route>

        {/* Redirection par défaut */}
        <Route path="*" element={<SignIn />} />
      </Routes>

    </MyContext.Provider>


    
  )
  
}

export {MyContext};
