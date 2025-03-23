
import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Retourne le token
  } catch (error) {
    console.error("Erreur de connexion :", error.response?.data || error.message);
    throw error;
  }
};
