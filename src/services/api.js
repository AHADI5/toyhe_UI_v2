import axios from "axios";

const API_BASE_URL = "https://toyhe-2.onrender.com/api/v1"; // URL de ton API

// Création d'une instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;



export const updatePersonalInfo = async (data) => {
  return api.put('/users/personal', data);
};

export const updateCompanyInfo = async (data) => {
  return api.put('/users/company', data);
};

export const updateAgentInfo = async (data) => {
  return api.put('/users/agent', data);
};

export const updatePassword = async (data) => {
  return api.put('/users/password', data);
};