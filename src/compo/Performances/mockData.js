import { faker } from '@faker-js/faker';

// Données des bateaux
export const boats = [
  { id: 1, name: 'Tous les bateaux', image: '/assets/bateaux/Tous_les_bateaux.jpg' },
  { id: 2, name: 'Emmanuel 1', image: '/assets/bateaux/Emmanuel_1.jpg' },
  { id: 3, name: 'Emmanuel 2', image: '/assets/bateaux/Emmanuel_2.jpg' },
  { id: 4, name: 'Emmanuel 3', image: '/assets/bateaux/Emmanuel_3.jpg' },
  { id: 5, name: 'Emmanuel 4', image: '/assets/bateaux/Emmanuel_4.jpg' },
];

// Classes de bateaux
export const boatClasses = [
  'Toutes les classes',
  'Première classe',
  'Deuxième classe',
  'Troisième classe',
  'Quatrième classe',
  'Cargaison',
];

// Génération de données pour les commandes
export const generateOrdersData = (period = 'day') => {
  const data = {
    onlineOrders: faker.number.int({ min: 100, max: 500 }),
    directSales: faker.number.int({ min: 100, max: 500 }),
    partnerOrders: faker.number.int({ min: 50, max: 200 }),
    agentOrders: faker.number.int({ min: 50, max: 200 }),
    revenue: {
      online: faker.number.int({ min: 10000, max: 50000 }),
      direct: faker.number.int({ min: 10000, max: 50000 }),
      partner: faker.number.int({ min: 5000, max: 20000 }),
      agent: faker.number.int({ min: 5000, max: 20000 }),
    },
    expenses: {
      partner: faker.number.int({ min: 2000, max: 10000 }),
      agent: faker.number.int({ min: 2000, max: 10000 }),
      fuel: faker.number.int({ min: 5000, max: 15000 }),
      maintenance: faker.number.int({ min: 3000, max: 12000 }),
      staff: faker.number.int({ min: 8000, max: 20000 }),
    },
  };

  return data;
};

// Génération de données pour les classes
export const generateClassData = () => {
  return {
    occupancy: {
      first: faker.number.int({ min: 30, max: 50 }),
      second: faker.number.int({ min: 40, max: 60 }),
      third: faker.number.int({ min: 50, max: 70 }),
      fourth: faker.number.int({ min: 60, max: 80 }),
    },
    revenue: {
      first: faker.number.int({ min: 15000, max: 25000 }),
      second: faker.number.int({ min: 12000, max: 20000 }),
      third: faker.number.int({ min: 10000, max: 15000 }),
      fourth: faker.number.int({ min: 8000, max: 12000 }),
    },
  };
};

// Génération de données pour les cargaisons
export const generateCargoData = () => {
  return {
    totalWeight: faker.number.int({ min: 10000, max: 50000 }),
    revenue: faker.number.int({ min: 20000, max: 100000 }),
    distribution: {
      regular: faker.number.int({ min: 5000, max: 25000 }),
      bulk: faker.number.int({ min: 5000, max: 25000 }),
    },
  };
};

// Génération de données d'occupation
export const generateOccupancyData = () => {
  const totalCapacity = 200;
  const occupied = faker.number.int({ min: 100, max: totalCapacity });
  
  return {
    occupied,
    available: totalCapacity - occupied,
    revenue: faker.number.int({ min: 5000, max: 20000 }),
  };
};

// Génération de données de tendances
export const generateTrendsData = (period = 'month') => {
  const numberOfPoints = period === 'day' ? 24 : period === 'week' ? 7 : period === 'month' ? 30 : 12;
  
  return Array.from({ length: numberOfPoints }, (_, i) => ({
    time: i,
    online: faker.number.int({ min: 50, max: 200 }),
    direct: faker.number.int({ min: 50, max: 200 }),
    partner: faker.number.int({ min: 20, max: 100 }),
    agent: faker.number.int({ min: 20, max: 100 }),
  }));
};