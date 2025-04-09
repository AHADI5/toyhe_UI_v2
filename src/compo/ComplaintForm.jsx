import { useState } from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const categories = [
  { id: 'delays', label: 'Retards et annulations', icon: '⏰' },
  { id: 'safety', label: 'Sécurité et conditions de voyage', icon: '🛡️' },
  { id: 'comfort', label: 'Confort et propreté', icon: '🪑' },
  { id: 'pricing', label: 'Tarification et billetterie', icon: '💰' },
  { id: 'service', label: 'Service client', icon: '👥' },
  { id: 'luggage', label: 'Bagages et objets perdus', icon: '🧳' },
  { id: 'contracts', label: 'Respect des contrats', icon: '📄' },
  { id: 'logistics', label: 'Collaboration logistique', icon: '🚢' },
  { id: 'environmental', label: 'Impact environnemental', icon: '🌱' },
  { id: 'infrastructure', label: 'Infrastructure et exploitation', icon: '🏗️' },
];

function ComplaintForm() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    attachments: [],
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validation de la catégorie
    if (!formData.category) {
      newErrors.category = 'Veuillez sélectionner une catégorie';
    }

    // Validation de la description
    if (!formData.description) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.length < 50) {
      newErrors.description = 'La description doit contenir au moins 50 caractères';
    }

    // Validation du nom
    if (!formData.name) {
      newErrors.name = 'Le nom est requis';
    }

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    // Validation du téléphone
    if (!formData.phone) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Le format du numéro de téléphone n\'est pas valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulaire soumis:', formData);
      setIsSubmitted(true);
      setFormData({
        category: '',
        description: '',
        attachments: [],
        name: '',
        email: '',
        phone: '',
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    setFormData(prev => ({
      ...prev,
      attachments: validFiles
    }));

    if (validFiles.length < files.length) {
      setErrors(prev => ({
        ...prev,
        attachments: 'Certains fichiers ont été ignorés. Formats acceptés : JPG, PNG, PDF. Taille max : 5MB'
      }));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-light">
      <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-primary">Formulaire de Réclamation</h2>
        
        {isSubmitted && (
          <div className="flex items-center p-4 mb-6 text-green-700 bg-green-100 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            Votre réclamation a été envoyée avec succès !
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Catégorie */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Catégorie de la réclamation *
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              value={formData.category}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, category: e.target.value }));
                setErrors(prev => ({ ...prev, category: '' }));
              }}
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="flex items-center mt-2 text-[#e93e3a]">
                <ExclamationCircleIcon className="w-5 h-5 mr-1" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Description détaillée *
            </label>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              value={formData.description}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, description: e.target.value }));
                setErrors(prev => ({ ...prev, description: '' }));
              }}
              placeholder="Décrivez votre réclamation en détail..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Minimum 50 caractères ({formData.description.length}/50)
            </p>
            {errors.description && (
              <p className="flex items-center mt-2 text-[#e93e3a]">
                <ExclamationCircleIcon className="w-5 h-5 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Pièces jointes */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Pièces jointes
            </label>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500">
              Formats acceptés : JPG, PNG, PDF. Taille max : 5MB
            </p>
            {errors.attachments && (
              <p className="flex items-center mt-2 text-[#e93e3a]">
                <ExclamationCircleIcon className="w-5 h-5 mr-1" />
                {errors.attachments}
              </p>
            )}
          </div>

          {/* Coordonnées */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Nom complet *
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  setErrors(prev => ({ ...prev, name: '' }));
                }}
                placeholder="Entrez votre nom complet"
              />
              {errors.name && (
                <p className="flex items-center mt-2 text-[#e93e3a]">
                  <ExclamationCircleIcon className="w-5 h-5 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email *
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.email}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, email: e.target.value }));
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
                placeholder="exemple@email.com"
              />
              {errors.email && (
                <p className="flex items-center mt-2 text-[#e93e3a]">
                  <ExclamationCircleIcon className="w-5 h-5 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Téléphone *
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.phone}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, phone: e.target.value }));
                  setErrors(prev => ({ ...prev, phone: '' }));
                }}
                placeholder="+33 6 12 34 56 78"
              />
              {errors.phone && (
                <p className="flex items-center mt-2 text-[#e93e3a]">
                  <ExclamationCircleIcon className="w-5 h-5 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary bg-[#1c75bc] text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Envoyer la réclamation
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintForm;