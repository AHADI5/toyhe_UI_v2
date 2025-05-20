import { createContext, useState, useEffect } from "react";
// Utilisation de l'import nommé pour jwtDecode
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "./services/authService.js";
import ChargementApp from "./compo/ChargementApp.jsx";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Vérification du token au démarrage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      if (decoded.authorities) {
        const arr = decoded.authorities.split(",");
        setRole(arr[0]);              // Le premier élément est le rôle principal
        setPermissions(arr.slice(1)); // Le reste correspond aux permissions d'accès aux modèles
      }
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

  // Fonction login : Si l'API renvoie un token, il est stocké et les infos utilisateur extraites
  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    if (!data.token) {
      throw new Error("Identifiants incorrects.");
    }
    localStorage.setItem("token", data.token);
    const decoded = jwtDecode(data.token);
    setUser(decoded);
    if (decoded.authorities) {
      const arr = decoded.authorities.split(",");
      setRole(arr[0]);
      setPermissions(arr.slice(1));
    }
    navigate("/user"); // Redirige vers la page d'accueil (adapter selon votre app)
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
    setPermissions([]);
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
        <ChargementApp />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, permissions, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
