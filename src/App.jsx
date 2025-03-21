import { Routes, Route } from "react-router-dom";
import React from "react";
import SignInForm from "./toyhe_app/auth/signinform";
import AppLayout from "./toyhe_lib/component/navigation/app_layout";

const App = () => {
  return (
    <Routes>
      <Route path="signin" element={<SignInForm />} />
      <Route path="app" element={<AppLayout />}>
        <Route index element={<h1>Dashboard</h1>} />
        <Route path="profile" element={<h1>Profile</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
