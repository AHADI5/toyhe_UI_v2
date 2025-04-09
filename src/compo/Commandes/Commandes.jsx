import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { 
  Box, 
  Card, 
  CardContent, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
  useMediaQuery,
  useTheme,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { fr } from 'date-fns/locale';
import { 
  ShoppingCart, 
  Store, 
  Handshake, 
  Ticket,
  Eye,
  Edit,
  Trash2,
  FileDown
} from 'lucide-react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import LogoEtsSILIMU from '../../assets/Logo_Ets_SILIMU.jpg'
import LogoTOYHE from '../../assets/TOYHE_LOGO_250x250.png'


const mockData = {
  orders: [
    { 
      id: 1, 
      name: "KULE WA-KANGIT'SI Robert", 
      class: "Premère classe + lit", 
      vocation: "Matin", 
      trajet: "Goma-Bukavu", 
      bateau: "Emmanuel 3", 
      clientType: "Par vente", 
      ticketType: "Aller simple",
      siege: "A012"
    },
    { 
      id: 2, 
      name: "KIRANGA KANYANGE Prince", 
      class: "Première", 
      vocation: "Matin", 
      trajet: "Goma-Bukavu", 
      bateau: "Emmanuel 3", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "A009"
    },
    { 
      id: 3, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 4, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 5, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 6, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 7, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 8, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 9, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 10, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 11, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 12, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 13, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 14, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 15, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 16, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 17, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 18, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 19, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 20, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 21, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 22, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 23, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 24, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 25, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 26, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 27, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 28, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 29, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 30, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 31, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 32, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 33, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 34, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 35, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 36, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 37, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 38, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 39, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 40, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 41, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 42, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 43, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 44, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 45, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 46, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 47, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 48, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    },
    { 
      id: 49, 
      name: "John Doe", 
      class: "Économique", 
      vocation: "Touriste", 
      trajet: "Paris-Londres", 
      bateau: "Emmanuel 1", 
      clientType: "En ligne", 
      ticketType: "Aller simple",
      siege: "A12"
    },
    { 
      id: 50, 
      name: "Jane Smith", 
      class: "Première", 
      vocation: "Affaires", 
      trajet: "Londres-Paris", 
      bateau: "Emmanuel 1", 
      clientType: "Vente", 
      ticketType: "Aller-retour",
      siege: "B15"
    }
  ],
  stats: {
    online: 150,
    store: 80,
    partner: 45,
    agent: 94
  }
};

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const Commandes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filterCriteria, setFilterCriteria] = useState('day');
  const [filterValue, setFilterValue] = useState(new Date());
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableDisplay, setTableDisplay] = useState('medium');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getMonthsList = () => {
    const currentYear = new Date().getFullYear();
    return months.map((month, index) => ({
      value: new Date(currentYear, index, 1),
      label: `${month} ${currentYear}`
    }));
  };

  const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100);
  };

  const totalOrders = Object.values(mockData.stats).reduce((a, b) => a + b, 0);

  const getDonutData = (value, label) => [
    ['Type', 'Nombre'],
    [label, value],
    ['Reste', totalOrders - value]
  ];

  const barData = [
    ['Type', 'Nombre', { role: 'style' }],
    ['En ligne', mockData.stats.online, '#1c75bc'],
    ['Vente', mockData.stats.store, '#1c75bc'],
    ['Partenaire', mockData.stats.partner, '#1c75bc'],
    ['Agent', mockData.stats.agent, '#1c75bc'],
  ];

  const StatCard = ({ title, value, icon: Icon }) => (
    <Card className="h-full" sx={{ backgroundColor: 'white', border: '1px solid #f5f5ff' }}>
      <CardContent className="flex items-center justify-between">
        <div>
          <Typography variant="h6" component="div" className="text-gray-600">
            {title}
          </Typography>
          <Typography variant="h4" component="div" className="font-bold">
            {value}
          </Typography>
        </div>
        <Icon size={40} className="text-[#1c75bc]" />
      </CardContent>
    </Card>
  );

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
    setDialogType(null);
  };

  const handleOpenDialog = (order, type) => {
    setSelectedOrder(order);
    setDialogType(type);
    setDialogOpen(true);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(mockData.orders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Commandes");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(data, 'Passagers.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
  
    // Définir la fonction pour l'en-tête
    const addHeader = (pageNumber) => {
      doc.addImage(LogoEtsSILIMU, 'JPG', 5, 0, 20, 15);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Le garant du transport lacustre", 25, 8, { align: "left" });
      doc.text(new Date().toLocaleDateString(), 180, 8, { align: "right" });
      doc.setFillColor(28, 117, 188);
      doc.rect(0, 15, 210, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text("LISTE DE PASSAGE DU BATEAU EMMANUEL 1", 105, 22, { align: 'center' });
    };
  
    // Définir la fonction pour le pied de page
    const addFooter = (pageNumber, totalPages) => {
      doc.addImage(LogoTOYHE, 'PNG', 10, doc.internal.pageSize.height - 12, 15, 10);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text("Plateforme de gestion et réservation du transport lacustre", 28, doc.internal.pageSize.height - 5);
      doc.text(`Page ${pageNumber}/${totalPages}`, 180, doc.internal.pageSize.height - 5, { align: "right" });
    };
  
    let pageNumber = 1;
  
    // Ajouter l'en-tête et le tableau
    doc.autoTable({
      startY: 30,
      head: [['N°', 'Nom', 'Classe', 'Vocation', 'Trajet', 'Bateau', 'Type de client', 'Type de billet', 'Siège']],
      body: mockData.orders.map(order => [
        order.id,
        order.name,
        order.class,
        order.vocation,
        order.trajet,
        order.bateau,
        order.clientType,
        order.ticketType,
        order.siege
      ]),
      margin: { top: 30 },  // Déplacer le tableau sous l'en-tête
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [28, 117, 188],
        textColor: [255, 255, 255],
      },
      didDrawPage: function (data) {
        const totalPages = doc.internal.getNumberOfPages();
        addHeader(pageNumber);
        addFooter(pageNumber, totalPages);
        pageNumber++;
      }
    });
  
    doc.save("Passagers.pdf");
  };
  

  const renderDialog = () => {
    if (!selectedOrder) return null;

    switch (dialogType) {
      case 'view':
        return (
          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Détails de la commande</DialogTitle>
            <DialogContent>
              <Box sx={{ py: 2 }}>
                {Object.entries(selectedOrder).map(([key, value]) => (
                  <Typography key={key} paragraph>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </Typography>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Fermer</Button>
            </DialogActions>
          </Dialog>
        );

      case 'edit':
        return (
          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Modifier la commande</DialogTitle>
            <DialogContent>
              <Box sx={{ py: 2 }}>
                {Object.entries(selectedOrder).map(([key, value]) => (
                  <TextField
                    key={key}
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    defaultValue={value}
                    margin="normal"
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Annuler</Button>
              <Button variant="contained" color="primary">Valider</Button>
            </DialogActions>
          </Dialog>
        );

      case 'delete':
        return (
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Êtes-vous sûr de vouloir supprimer cette commande ?
              </DialogContentText>
              <Box sx={{ mt: 2 }}>
                <Typography><strong>N°:</strong> {selectedOrder.id}</Typography>
                <Typography><strong>Nom:</strong> {selectedOrder.name}</Typography>
                <Typography><strong>Trajet:</strong> {selectedOrder.trajet}</Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Annuler</Button>
              <Button color="error" variant="contained">Supprimer</Button>
            </DialogActions>
          </Dialog>
        );

      default:
        return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <div className="p-6 max-w-[1400px] mx-auto">
        {/* Filtres */}
        <Paper className="p-4 mb-6">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Critère de sélection</InputLabel>
                <Select
                  value={filterCriteria}
                  onChange={(e) => setFilterCriteria(e.target.value)}
                  label="Critère de sélection"
                >
                  <MenuItem value="year">Année</MenuItem>
                  <MenuItem value="month">Mois</MenuItem>
                  <MenuItem value="week">Semaine</MenuItem>
                  <MenuItem value="day">Jour</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                {filterCriteria === 'day' ? (
                  <DatePicker
                    label="Date"
                    value={filterValue}
                    onChange={(newValue) => setFilterValue(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                ) : filterCriteria === 'month' ? (
                  <Select
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    label="Mois"
                  >
                    {getMonthsList().map((month) => (
                      <MenuItem key={month.label} value={month.value}>
                        {month.label}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Select
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    label="Valeur"
                  >
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                  </Select>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Ordre d'affichage</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  label="Ordre d'affichage"
                >
                  <MenuItem value="asc">Croissant</MenuItem>
                  <MenuItem value="desc">Décroissant</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Colonne de tri</InputLabel>
                <Select
                  value={sortColumn}
                  onChange={(e) => setSortColumn(e.target.value)}
                  label="Colonne de tri"
                >
                  <MenuItem value="name">Nom</MenuItem>
                  <MenuItem value="vocation">Vocation</MenuItem>
                  <MenuItem value="class">Classe</MenuItem>
                  <MenuItem value="amount">Montant</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Statistiques */}
        <Grid container spacing={3} className="mb-6">
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Commandes en ligne" value={mockData.stats.online} icon={ShoppingCart} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Commandes par vente" value={mockData.stats.store} icon={Store} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Commandes partenaire" value={mockData.stats.partner} icon={Handshake} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Commandes des agent" value={mockData.stats.agent} icon={Ticket} />
          </Grid>
        </Grid>

        {/* Graphiques */}
        <Grid container spacing={3} className="mb-6">
          {Object.entries(mockData.stats).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <Paper className="p-4" sx={{ height: '300px' }}>
                <Typography variant="h6" className="mb-4 text-center">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Chart
                  chartType="PieChart"
                  data={getDonutData(value, key)}
                  options={{
                    pieHole: 0.7,
                    colors: ['#1c75bc', '#f5f5ff'],
                    legend: { position: 'none' },
                    pieSliceText: 'none',
                    chartArea: { width: '100%', height: '80%' },
                    tooltip: { trigger: 'none' }
                  }}
                  width="100%"
                  height="200px"
                />
                <Typography variant="h4" className="text-center font-bold text-[#1c75bc]">
                  {calculatePercentage(value, totalOrders)}%
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Tableau */}
        <Paper className="p-4 mt-5">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6">Liste des commandes</Typography>
            <div className="flex items-center space-x-2">
              <ToggleButtonGroup
                value={tableDisplay}
                exclusive
                onChange={(e, value) => value && setTableDisplay(value)}
                size="small"
              >
                <ToggleButton value="compact">Condensé</ToggleButton>
                <ToggleButton value="medium">Moyen</ToggleButton>
                <ToggleButton value="spacious">Espacé</ToggleButton>
              </ToggleButtonGroup>
              <Button variant="outlined" startIcon={<FileDown />} onClick={exportToExcel}>
                Excel
              </Button>
              <Button variant="outlined" startIcon={<FileDown />} onClick={exportToPDF}>
                PDF
              </Button>
            </div>
          </div>
          {isMobile ? (
            <div className="space-y-4">
              {mockData.orders.map((order) => (
                <Paper key={order.id} elevation={2} className="p-4">
                  <Typography variant="h6">{order.name}</Typography>
                  <Typography>Siège: {order.siege}</Typography>
                  <Typography>Classe: {order.class}</Typography>
                  <Typography>Trajet: {order.trajet}</Typography>
                  <div className="flex justify-end mt-2 space-x-2">
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(order, 'view')}>
                      <Eye size={20} />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(order, 'edit')}>
                      <Edit size={20} />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleOpenDialog(order, 'delete')}>
                      <Trash2 size={20} />
                    </IconButton>
                  </div>
                </Paper>
              ))}
            </div>
          ) : (
            <TableContainer style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Table stickyHeader size={tableDisplay === 'compact' ? 'small' : tableDisplay === 'spacious' ? 'medium' : 'medium'}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1c75bc' }}>
                    {['N°', 'Nom', 'Classe', 'Vocation', 'Trajet', 'Bateau', 'Type de client', 'Type de billet', 'Siège', 'Actions'].map((header) => (
                      <TableCell key={header} sx={{ color: 'white', backgroundColor: '#1c75bc', position: 'sticky', top: 0, zIndex: 2 }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.orders.slice(0, rowsPerPage).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.class}</TableCell>
                      <TableCell>{order.vocation}</TableCell>
                      <TableCell>{order.trajet}</TableCell>
                      <TableCell>{order.bateau}</TableCell>
                      <TableCell>{order.clientType}</TableCell>
                      <TableCell>{order.ticketType}</TableCell>
                      <TableCell>{order.siege}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(order, 'view')}>
                          <Eye size={20} />
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(order, 'edit')}>
                          <Edit size={20} />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleOpenDialog(order, 'delete')}>
                          <Trash2 size={20} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <div className="mt-4">
            <FormControl variant="outlined" size="small">
              <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                <MenuItem value={10}>10 lignes</MenuItem>
                <MenuItem value={25}>25 lignes</MenuItem>
                <MenuItem value={50}>50 lignes</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Paper>

        {renderDialog()}
      </div>
    </LocalizationProvider>
  );
};

export default Commandes;