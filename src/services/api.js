
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // URL de ton API Spring Boot

// Création d'une instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter automatiquement le token JWT si l'utilisateur est connecté
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupérer le token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajouter le token dans le header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
