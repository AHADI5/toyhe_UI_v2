
import api from "./api.js";

export const login = async (email, password) => {
  try {
    const response = await api.post("auth/", { email, password });
    return response.data; // Doit renvoyer { token: "..." }
  } catch (error) {
    console.error("Erreur de connexion :", error.response?.data || error.message);
    throw error;
  }
};
