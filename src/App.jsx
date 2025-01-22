import './App.css'
import { Route , Routes } from "react-router-dom"
import SignUp from './compo/SignUp'
import SignIn from './compo/LoginPage'
import ForgotPasswordPage from './compo/ForgotPasswordPage'
import BodyAuthLayout from './compo/BodyAuthLayout'
import Dashboard from './compo/Dashboard'
import Utilisateur from './compo/Utilisateurs'
import { createContext } from 'react'

import UserManagement from './compo/UserManagement';




const MyContext = createContext();

const values = {

}

export default function App() {
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
