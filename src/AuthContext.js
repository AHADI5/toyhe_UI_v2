import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "./services/authService.js";
import ChargementApp from "./compo/ChargementApp.jsx";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Vérification du token au démarrage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setUser(jwtDecode(token));
    } else {
      localStorage.removeItem("token");
    }
    setLoading(false);
  }, []);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  // Fonction login : en cas d'erreur, l'erreur est remontée pour être gérée dans le composant Login
  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    if (!data.token) {
      throw new Error("Identifiants incorrects.");
    }
    localStorage.setItem("token", data.token);
    setUser(jwtDecode(data.token));
    navigate("/user");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
        < ChargementApp />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
