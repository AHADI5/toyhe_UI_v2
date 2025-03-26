import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Considérer le token comme expiré en cas d'erreur
  }
};

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  // Vérifier l'authentification et l'expiration du token
  if (!token || !user || isTokenExpired(token)) {
    if (user) logout(); // Déconnexion automatique si token expiré
    return <Navigate to="/signin" />;
  }

  // Extraire les rôles de l'utilisateur
  const userRoles = user.authorities ? user.authorities.split(",") : [];

  // Vérifier si l'utilisateur a au moins un des rôles autorisés
  if (allowedRoles && !allowedRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  // Autoriser l'accès
  return <Outlet />;
};

export default ProtectedRoute;
