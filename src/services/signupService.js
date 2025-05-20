import api from './api.js';

const signup = async (formData, navigate) => {
  // Définition du rôle en fonction du type de compte
  const rolesId = formData.isCompany ? [3] : [2];

  // Construction des données à envoyer en fonction du type de compte
  const payload = {
    email: formData.email,
    password: formData.password,
    rolesId,
    isCompany: formData.isCompany,
    nonCompanyCustomerRegisterRequest: formData.isCompany ? null : {
      customerName: `${formData.firstName} ${formData.lastName}`,
      gender: formData.gender,
      phone: formData.phone
    },
    companyCustomerRegisterRequest: formData.isCompany ? {
      companyName: formData.companyName,
      foundingYear: formData.foundingYear,
      phone: formData.phone
    } : null
  };

  try {
    const response = await api.post('users/', payload);

    if (response.status === 201 || response.status === 200) {
      console.log('Inscription réussie:', response.data);
      navigate('/user');
      return { success: true, data: response.data };
    } else {
      console.warn('Réponse inattendue:', response);
      return { success: false, error: 'Réponse inattendue du serveur.' };
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);

    let errorMessage = "Une erreur est survenue.";
    if (error.response) {
      errorMessage = error.response.data.message || "Erreur du serveur.";
    } else if (error.request) {
      errorMessage = "Le serveur ne répond pas. Vérifiez votre connexion.";
    } else {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
};

export { signup };
