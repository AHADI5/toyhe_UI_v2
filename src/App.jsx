import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./toyhe_app/auth/SignInForm";
import AppLayout from "./toyhe_lib/component/navigation/AppLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="signin" element={<SignInForm />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
