import React, { useState } from 'react';
import { Calendar, Send, Mail, MessageSquare, Target, Clock, AlertCircle, Paperclip, X } from 'lucide-react';

const IMPORTANT_DATES = {
  nationalHolidays: [
    { date: '2024-01-01', name: "Nouvel An" },
    { date: '2024-01-04', name: "Journée des Martyrs de l'Indépendance" },
    { date: '2024-01-16', name: "Journée du Héros Laurent-Désiré Kabila" },
    { date: '2024-01-17', name: "Journée du Héros Patrice Lumumba" },
    { date: '2024-03-08', name: "Journée Internationale des Droits des Femmes" },
    { date: '2024-06-30', name: "Fête de l'Indépendance" },
    { date: '2024-08-01', name: "Journée des Parents" },
    { date: '2024-12-25', name: "Noël" }
  ],
  worldDays: [
    { date: '2024-03-22', name: "Journée Mondiale de l'Eau" },
    { date: '2024-04-22', name: "Journée de la Terre" },
    { date: '2024-09-27', name: "Journée Mondiale du Tourisme" },
    { date: '2024-10-04', name: "Journée Mondiale des Animaux" }
  ],
  peakDays: [
    { date: '2024-12-24', name: "Veille de Noël" },
    { date: '2024-12-31', name: "Veille du Nouvel An" }
  ]
};

const TARGET_AUDIENCES = [
  { id: 'simple', label: 'Client Simple' },
  { id: 'vip', label: 'Client VIP' },
  { id: 'partner', label: 'Partenaire' }
];

function MarketingCampaignManager() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAudience: '',
    channel: 'email',
    selectedEvent: '',
    eventDate: '',
    specialOffer: '',
    discount: ''
  });

  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.targetAudience) newErrors.targetAudience = 'Le public cible est requis';
    if (!formData.selectedEvent) newErrors.selectedEvent = 'Un événement doit être sélectionné';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Simulate API call
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append each attachment to FormData
      attachments.forEach(file => {
        formDataToSend.append('attachments', file);
      });

      console.log('Sending campaign data:', formData);
      console.log('Attachments:', attachments);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Campagne créée avec succès!');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Erreur lors de la création de la campagne');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#f5f5ff] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Send className="w-8 h-8" />
          Gestionnaire de Campagnes Marketing
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Selection Section */}
          <div className="bg-[#f5f5ff] p-6 rounded-lg border-2 border-[#1c75bc] mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Sélection de l'Événement
            </h2>
            
            <div className="grid gap-4">
              <select
                name="selectedEvent"
                value={formData.selectedEvent}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg ${errors.selectedEvent ? 'border-[#e93e3a]' : 'border-gray-300'}`}
              >
                <option value="">Sélectionnez un événement</option>
                <optgroup label="Jours Fériés et Événements Nationaux">
                  {IMPORTANT_DATES.nationalHolidays.map(event => (
                    <option key={event.date} value={event.date}>
                      {event.name} - {event.date}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Journées Mondiales">
                  {IMPORTANT_DATES.worldDays.map(event => (
                    <option key={event.date} value={event.date}>
                      {event.name} - {event.date}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Jours de Forte Affluence">
                  {IMPORTANT_DATES.peakDays.map(event => (
                    <option key={event.date} value={event.date}>
                      {event.name} - {event.date}
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.selectedEvent && (
                <p className="text-[#e93e3a] text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.selectedEvent}
                </p>
              )}
            </div>
          </div>

          {/* Campaign Details Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Détails de la Campagne
            </h2>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de la Campagne
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${errors.title ? 'border-[#e93e3a]' : 'border-gray-300'}`}
                  placeholder="Ex: Offre Spéciale Noël"
                />
                {errors.title && (
                  <p className="text-[#e93e3a] text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full p-3 border rounded-lg ${errors.description ? 'border-[#e93e3a]' : 'border-gray-300'}`}
                  placeholder="Détails de votre campagne..."
                />
                {errors.description && (
                  <p className="text-[#e93e3a] text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Public Cible
                </label>
                <select
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg ${errors.targetAudience ? 'border-[#e93e3a]' : 'border-gray-300'}`}
                >
                  <option value="">Sélectionnez le public cible</option>
                  {TARGET_AUDIENCES.map(audience => (
                    <option key={audience.id} value={audience.id}>
                      {audience.label}
                    </option>
                  ))}
                </select>
                {errors.targetAudience && (
                  <p className="text-[#e93e3a] text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.targetAudience}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Canal de Communication
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="channel"
                      value="email"
                      checked={formData.channel === 'email'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1c75bc]"
                    />
                    <Mail className="w-5 h-5 text-[#1c75bc]" />
                    Email
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="channel"
                      value="sms"
                      checked={formData.channel === 'sms'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1c75bc]"
                    />
                    <MessageSquare className="w-5 h-5 text-[#1c75bc]" />
                    SMS
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offre Spéciale
                </label>
                <input
                  type="text"
                  name="specialOffer"
                  value={formData.specialOffer}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg border-gray-300"
                  placeholder="Ex: -20% sur les billets VIP"
                />
              </div>

              {/* File Attachment Section - Only visible for email campaigns */}
              {formData.channel === 'email' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Pièces jointes
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4"
                      />
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1c75bc] border border-[#1c75bc] rounded-lg hover:bg-[#1c75bc] hover:text-white transition-colors duration-200"
                      >
                        <Paperclip className="w-4 h-4" />
                        Ajouter des fichiers
                      </button>
                    </div>
                  </div>

                  {/* Display attached files */}
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-600 truncate">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-gray-400 hover:text-[#e93e3a] transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-[#1c75bc] hover:bg-[#2b3990] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Lancer la Campagne
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MarketingCampaignManager;