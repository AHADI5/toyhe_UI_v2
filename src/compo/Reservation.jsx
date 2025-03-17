
import React, { useState, useEffect } from 'react';
import { 
  Ship, 
  CreditCard,
  ArrowRight, 
  ArrowLeftRight,
  Bed,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  CheckCircle,
  XCircle
} from 'lucide-react';

const CLASSES = [
  { id: 1, name: 'Première classe', price: 100, hasbed: true },
  { id: 2, name: 'Deuxième classe', price: 75, hasbed: false },
  { id: 3, name: 'Troisième classe', price: 50, hasbed: false },
  { id: 4, name: 'Quatrième classe', price: 25, hasbed: false }
];

const PAYMENT_METHODS = [
  { 
    id: 'airtel', 
    name: 'Airtel Money', 
    logo: '/assets/cannaux.de.paiement/Airtel_Money.png',
    icon: <Phone className="w-4 h-4" />,
    fields: ['phone']
  },
  { 
    id: 'orange', 
    name: 'Orange Money', 
    logo: '/assets/cannaux.de.paiement/Orange_Money.jpg',
    icon: <Phone className="w-4 h-4" />,
    fields: ['phone']
  },
  { 
    id: 'mpesa', 
    name: 'M-Pesa', 
    logo: '/assets/cannaux.de.paiement/M_Pesa.png',
    icon: <Phone className="w-4 h-4" />,
    fields: ['phone']
  },
  { 
    id: 'pple', 
    name: 'PPLE Mobile', 
    logo: '/assets/cannaux.de.paiement/PPLE_Mobile.png',
    icon: <Phone className="w-4 h-4" />,
    fields: ['phone']
  },
  { 
    id: 'paypal', 
    name: 'PayPal', 
    logo: '/assets/cannaux.de.paiement/PayPal.png',
    icon: <Mail className="w-4 h-4" />,
    fields: ['email']
  },
  { 
    id: 'card', 
    name: 'Visa/Mastercard', 
    logo: '/assets/cannaux.de.paiement/VISA_MasterCard.jpg',
    icon: <CreditCard className="w-4 h-4" />,
    fields: ['cardNumber', 'expiry', 'cvv', 'name']
  },
  { 
    id: 'maxicash', 
    name: 'MaxiCash',
    logo: '/assets/cannaux.de.paiement/MaxiCash.jpg',
    icon: <Phone className="w-4 h-4" />,
    fields: ['phone', 'pin']
  } 
];

const COUNTRIES = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola",
  "Antigua-et-Barbuda", "Arabie Saoudite", "Argentine", "Arménie", "Australie", "Autriche",
  "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin",
  "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil",
  "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-Vert",
  "République centrafricaine", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo",
  "République démocratique du Congo", "Îles Cook", "Corée du Nord", "Corée du Sud", "Costa Rica",
  "Côte d'Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti", "République dominicaine", "Dominique",
  "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini",
  "États-Unis", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Ghana",
  "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée-Bissau", "Guinée équatoriale", "Guyana",
  "Haïti", "Honduras", "Hongrie", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande",
  "Israël", "Italie", "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan",
  "Kiribati", "Koweït", "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye",
  "Liechtenstein", "Lituanie", "Luxembourg", "Macédoine du Nord", "Madagascar", "Malaisie",
  "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Îles Marshall", "Maurice", "Mauritanie",
  "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique",
  "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Niue", "Norvège",
  "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", "Palaos", "Palestine",
  "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines",
  "Pologne", "Portugal", "Qatar", "Roumanie", "Royaume-Uni", "Russie", "Rwanda",
  "Saint-Kitts-et-Nevis", "Sainte-Lucie", "Saint-Marin", "Saint-Vincent-et-les-Grenadines",
  "Salomon", "Salvador", "Samoa", "Sao Tomé-et-Principe", "Sénégal", "Serbie", "Seychelles",
  "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud",
  "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie", "Tadjikistan", "Tanzanie", "Tchad",
  "République tchèque", "Thaïlande", "Timor oriental", "Togo", "Tonga", "Trinité-et-Tobago",
  "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine", "Uruguay", "Vanuatu",
  "Vatican", "Venezuela", "Vietnam", "Yémen", "Zambie", "Zimbabwe"
];

const detectUserType = () => {
  return 'client';
};

const PassengerForm = ({ index, data, onChange, showReturnFields }) => (
  <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200">
    <h3 className="text-lg font-medium text-gray-900">Passager {index + 1}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          value={data.nom}
          onChange={(e) => onChange(index, 'nom', e.target.value)}
          className="mt-1 h-12 px-4 block w-full rounded-md border-gray-600 bg-[#f5f5ff] shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Post-nom</label>
        <input
          type="text"
          value={data.postnom}
          onChange={(e) => onChange(index, 'postnom', e.target.value)}
          className="mt-1 h-12 px-4 block w-full rounded-md border-gray-600 bg-[#f5f5ff] shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          type="text"
          value={data.prenom}
          onChange={(e) => onChange(index, 'prenom', e.target.value)}
          className="mt-1 h-12 px-4 block w-full rounded-md border-gray-600 bg-[#f5f5ff] shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Sexe</label>
        <select
          value={data.sexe}
          onChange={(e) => onChange(index, 'sexe', e.target.value)}
          className="mt-1 h-12 px-4 block w-full rounded-md border-gray-600 bg-[#f5f5ff] shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Sélectionner</option>
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nationalité</label>
        <select
          value={data.nationalite}
          onChange={(e) => onChange(index, 'nationalite', e.target.value)}
          className="mt-1 h-12 px-4 block w-full rounded-md border-gray-600 bg-[#f5f5ff] shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Sélectionner un pays</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
        <input
          type="date"
          value={data.dateNaissance}
          onChange={(e) => onChange(index, 'dateNaissance', e.target.value)}
          className="mt-1 h-12 px-4 block w-full rounded-md border-gray-600 bg-[#f5f5ff] shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Vocation</label>
        <select
          value={data.vocation}
          onChange={(e) => onChange(index, 'vocation', e.target.value)}
          className="mt-1 h-12 px-4 block w-full rounded-md border-gray-600 bg-[#f5f5ff] shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="matin">Matin</option>
          <option value="soir">Soir</option>
        </select>
      </div>

      {showReturnFields && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date de retour</label>
            <input
              type="date"
              value={data.dateRetour}
              onChange={(e) => onChange(index, 'dateRetour', e.target.value)}
              className="mt-1 h-12 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Heure de retour</label>
            <input
              type="time"
              value={data.heureRetour}
              onChange={(e) => onChange(index, 'heureRetour', e.target.value)}
              className="mt-1 h-12 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </>
      )}
    </div>
  </div>
);

const PaymentForm = ({ method, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: Math.random() > 0.5 });
        }, 1500);
      });

      setPaymentStatus(response.success);
      if (response.success) {
        onSubmit(formData);
      }
    } catch (error) {
      setPaymentStatus(false);
    }
  };

  const renderField = (field) => {
    switch (field) {
      case 'email':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <div className="mt-1 relative">
              <input
                type="email"
                className="h-12 block w-full rounded-md border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                placeholder="exemple@email.com"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>
        );
      case 'phone':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              Numéro de téléphone
            </label>
            <div className="mt-1 relative">
              <input
                type="tel"
                className="h-12 block w-full rounded-md border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                placeholder="+243 990 691 536"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>
        );
      case 'pin':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              Code PIN
            </label>
            <div className="mt-1 relative">
              <input
                type="password"
                className="h-12 block w-full rounded-md border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                placeholder="****"
                maxLength={4}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                required
              />
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>
        );
      case 'cardNumber':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              Numéro de carte
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                className="h-12 block w-full rounded-md border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                required
              />
              <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>
        );
      case 'expiry':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              Date d'expiration
            </label>
            <input
              type="text"
              className="h-12 mt-1 block w-full rounded-md border-gray-300 px-4 focus:border-blue-500 focus:ring-blue-500"
              placeholder="MM/YY"
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              required
            />
          </div>
        );
      case 'cvv':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <div className="mt-1 relative">
              <input
                type="password"
                className="h-12 block w-full rounded-md border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                placeholder="123"
                maxLength={3}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                required
              />
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>
        );
      case 'name':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              Nom du titulaire
            </label>
            <input
              type="text"
              className="h-12 mt-1 block w-full rounded-md border-gray-300 px-4 focus:border-blue-500 focus:ring-blue-500"
              placeholder="JEAN DUPONT"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {method.fields.map(renderField)}
      
      {paymentStatus !== null && (
        <div className={`p-4 rounded-lg ${paymentStatus ? 'bg-green-50' : 'bg-red-50'} flex items-center space-x-2`}>
          {paymentStatus ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700">Votre réservation a bien été traitée.</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">Votre réservation n'a pas réussi.</span>
            </>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={paymentStatus === true}
      >
        Confirmer le paiement
      </button>
    </form>
  );
};

function Reservation() {
  const [userType, setUserType] = useState(null);
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [tripType, setTripType] = useState('single');
  const [includeBed, setIncludeBed] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [passengers, setPassengers] = useState([{
    nom: '',
    postnom: '',
    prenom: '',
    sexe: '',
    nationalite: '',
    dateNaissance: '',
    vocation: 'matin',
    dateRetour: '',
    heureRetour: ''
  }]);

  useEffect(() => {
    const detectedType = detectUserType();
    setUserType(detectedType);
    if (detectedType === 'agent') {
      setTicketCount(1);
    }
  }, []);

  useEffect(() => {
    const newPassengers = Array(ticketCount).fill(null).map((_, index) => 
      passengers[index] || {
        nom: '',
        postnom: '',
        prenom: '',
        sexe: '',
        nationalite: '',
        dateNaissance: '',
        vocation: 'matin',
        dateRetour: '',
        heureRetour: ''
      }
    );
    setPassengers(newPassengers);
  }, [ticketCount]);

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index] = {
      ...newPassengers[index],
      [field]: value
    };
    setPassengers(newPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === 'client') {
      setShowPayment(true);
    } else {
      alert('Réservation confirmée !');
    }
  };

  const handlePayment = (paymentData) => {
    console.log('Payment data:', paymentData);
  };

  const handleBack = () => {
    setShowPayment(false);
    setSelectedPayment(null);
  };

  const calculateTotal = () => {
    let total = selectedClass.price * ticketCount;
    if (includeBed && selectedClass.hasbed) {
      total += 25 * ticketCount;
    }
    if (tripType === 'return') {
      total *= 2;
    }
    return total;
  };

  const validateForm = () => {
    return passengers.every(passenger => 
      passenger.nom && 
      passenger.postnom && 
      passenger.prenom && 
      passenger.sexe && 
      passenger.nationalite && 
      passenger.dateNaissance && 
      passenger.vocation && 
      (tripType === 'single' || (passenger.dateRetour && passenger.heureRetour))
    );
  };

  if (!userType) return null;

  return (
    <div className="min-h-screen bg-[#f5f5ff] py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-2 mb-6">
            <Ship className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Réservation de Transport Lacustre</h1>
          </div>

          {!showPayment ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Classe</label>
                  <select
                    value={selectedClass.id}
                    onChange={(e) => {
                      const newClass = CLASSES.find(c => c.id === parseInt(e.target.value));
                      setSelectedClass(newClass);
                      if (!newClass.hasbed) {
                        setIncludeBed(false);
                      }
                    }}
                    className="h-12 w-full rounded-md border-gray-300 bg-[#f5f5ff] px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    {CLASSES.map((classe) => (
                      <option key={classe.id} value={classe.id}>
                        {classe.name} - {classe.price} $
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Type de voyage</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setTripType('single')}
                      className={`h-12 flex items-center px-4 rounded-md ${
                        tripType === 'single'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#f5f5ff] text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Aller simple
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType('return')}
                      className={`h-12 flex items-center px-4 rounded-md ${
                        tripType === 'return'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#f5f5ff] text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowLeftRight className="w-4 h-4 mr-2" />
                      Aller-retour
                    </button>
                  </div>
                </div>
              </div>

              {selectedClass.hasbed && (
                <div className="flex items-center space-x-2 p-4 bg-[#f5f5ff] rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="bed"
                    checked={includeBed}
                    onChange={(e) => setIncludeBed(e.target.checked)}
                    className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="bed" className="flex items-center text-sm text-gray-700">
                    <Bed className="w-4 h-4 mr-1" />
                    Réserver un lit (+25 $)
                  </label>
                </div>
              )}

              {userType !== 'agent' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre de billets
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value)))}
                    className="h-12 w-32 rounded-md border-gray-300 bg-[#f5f5ff] px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              <div className="space-y-6">
                {passengers.map((passenger, index) => (
                  <PassengerForm
                    key={index}
                    index={index}
                    data={passenger}
                    onChange={handlePassengerChange}
                    showReturnFields={tripType === 'return'}
                  />
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">{calculateTotal()} $</span>
                </div>
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!validateForm()}
                >
                  {userType === 'client' ? 'Procéder au paiement' : 'Confirmer la réservation'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBack}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Retour
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-900">Choisir le mode de paiement</h2>
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method)}
                        className={`w-full h-16 flex items-center p-3 rounded-lg border ${
                          selectedPayment?.id === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <img src={method.logo} alt={method.name} className="w-8 h-8 rounded object-cover" />
                        <span className="ml-3 font-medium">{method.name}</span>
                        {method.icon && <span className="ml-auto">{method.icon}</span>}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#f5f5ff] p-6 rounded-lg border border-gray-200">
                  {selectedPayment ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Paiement via {selectedPayment.name}
                      </h3>
                      <PaymentForm
                        method={selectedPayment}
                        onSubmit={handlePayment}
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      Veuillez choisir votre canal de paiement
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservation;