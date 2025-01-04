import { useState } from 'react'
import { Route , Routes } from "react-router-dom"
import './App.css'
import BodyAuthLayout from './compo/BodyAuthLayout'
import Dashboard from './compo/Dashboard'
import Utilisateurs from './compo/Utilisateurs'

function App() {

  return (
    <Routes>

      <Route path="/" element={ <BodyAuthLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Utilisateurs />} />
      </Route>

    </Routes>
  )
}

export default App
