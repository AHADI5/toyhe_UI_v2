import api from './api.js';

/**
 * Récupère la liste de tous les bateaux
 */
const getAllBoats = async () => {
  return await handleApiCall(() => api.get('/boat'));
};

/**
 * Récupère les détails d'un bateau par son ID
 */
const getBoatById = async (boatID) => {
  return await handleApiCall(() => api.get(`/boat/${boatID}`));
};

/**
 * Enregistre un nouveau bateau
 */
const registerBoat = async (boatData) => {
  return await handleApiCall(() => api.post('/boat', boatData));
};

/**
 * Met à jour les informations d'un bateau
 */
const updateBoat = async (boatID, boatData) => {
  return await handleApiCall(() => api.put(`/boat/${boatID}`, boatData));
};

/**
 * Récupère les classes d'un bateau
 */
const getBoatClasses = async (boatID) => {
  return await handleApiCall(() => api.get(`/boatClass/${boatID}`));
};

/**
 * Ajoute une nouvelle classe à un bateau
 */
const newClass = async (boatID, classData) => {
  return await handleApiCall(() => api.post(`/boatClass/${boatID}`, classData));
};

/**
 * Met à jour une classe de bateau existante
 */
const updateBoatClass = async (boatClassID, classData) => {
  return await handleApiCall(() => api.put(`/boatClass/${boatClassID}`, classData));
};

/**
 * Fonction générique pour gérer les appels API
 */
const handleApiCall = async (apiCall) => {
  try {
    const response = await apiCall();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur API :", error);
    return handleApiError(error);
  }
};

/**
 * Gestion des erreurs API pour un retour structuré
 */
const handleApiError = (error) => {
  let errorMessage = "Une erreur est survenue.";

  if (error.response) {
    console.error("Réponse du serveur:", error.response.data);
    errorMessage = error.response.data.message || "Erreur du serveur.";
  } else if (error.request) {
    console.error("Pas de réponse du serveur:", error.request);
    errorMessage = "Le serveur ne répond pas. Vérifiez votre connexion.";
  } else {
    console.error("Erreur inattendue:", error.message);
    errorMessage = error.message;
  }

  return { success: false, error: errorMessage };
};

export {
  getAllBoats,
  getBoatById,
  registerBoat,
  updateBoat,
  getBoatClasses,
  newClass,
  updateBoatClass
};
