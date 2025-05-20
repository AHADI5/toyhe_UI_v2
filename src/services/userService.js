
import api from "./api.js";

// Fonction pour récupérer la liste des utilisateurs
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data; // Retourne la liste des utilisateurs
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};


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