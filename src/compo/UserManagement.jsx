
import React, { useState } from 'react';
import { 
  Box,
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
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

import { 
  UserIcon, UsersIcon, BuildingOfficeIcon,
  DocumentArrowDownIcon, TableCellsIcon,
  PlusIcon, BriefcaseIcon
} from '@heroicons/react/24/outline';
import AddUserDialog from './AddUserDialog';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import LogoEtsSILIMU from '../assets/Logo_Ets_SILIMU.jpg'
import LogoTOYHE from '../assets/TOYHE_LOGO_250x250.png'


const utilisateurs = [
  {
    id: 1,
    name: 'AMURI TCHALUBA Héritier',
    phone: '+243999001156',
    email: 'heritieramuritcha@gmail.com',
    address: 'N°049 Dikuta, Kasika, Karisimbi, Goma',
    role: 'Utilisateur'
  },
  {
    id: 2,
    name: "KULE WA-KANGIT'SI Robert",
    phone: '+243999001156',
    email: 'robert.kule@gmail.com',
    address: 'N°032 Baraka, Himbi 1, Goma, Goma',
    role: 'Agent' // Correction de "ole" en "role"
  }
];



const UserManagement = () => {
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


  const [showBagagisteModal, setShowBagagisteModal] = useState(false);
  const [openDialogAddUser, setOpenDialogAddUser] = useState(false);

  const getMonthsList = () => {
    const currentYear = new Date().getFullYear();
    return months.map((month, index) => ({
      value: new Date(currentYear, index, 1),
      label: `${month} ${currentYear}`
    }));
  };

     const handleOpenDialogAddUser = () => {
       setOpenDialogAddUser(true);
     };
   
     const handleCloseDialogAddUser = () => {
       setOpenDialogAddUser(false);
     };

  const stats = [
    { title: 'Total des agents', count: '20', icon: UserIcon },
    { title: 'Clients potentiels', count: '10K', icon: UsersIcon },
    { title: 'Total des clients', count: '5K', icon: UsersIcon },
    { title: 'Total des partenaires', count: '100', icon: BuildingOfficeIcon },
    { title: 'Tous les utilisateurs', count: '30K', icon: UsersIcon },
  ];

  const handleAddBagagiste = () => {
    setShowBagagisteModal(true);
  };

  const formatCurrencyNombre = (value) => {
    if (value >= 1_000_000) {
      return new Intl.NumberFormat('fr-FR').format(value / 1_000_000) + ' M';
    } else if (value >= 1_000) {
      return new Intl.NumberFormat('fr-FR').format(value / 1_000) + ' K';
    }
    return new Intl.NumberFormat('fr-FR')
      .format(value)
  };

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
    const ws = XLSX.utils.json_to_sheet(utilisateurs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reservations");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(data, 'Utilisateurs.xlsx');
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
      doc.text("LISTE DES UTILISATEURS DE LA PLATEFORME TOYHE", 105, 22, { align: 'center' });
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
      body: utilisateurs.map(order => [
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
  
    doc.save("Utilisateurs.pdf");
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

        {/* Section 2: Actions & Statistiques */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-6">
          {/* Actions principales */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              className="bg-[#1c75bc] hover:bg-[#2b3990] text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleOpenDialogAddUser}
            >
              <PlusIcon className="h-5 w-5" />
              Ajouter un utilisateur
            </button>

            <button 
              onClick={handleAddBagagiste}
              className="bg-[#1c75bc] hover:bg-[#2b3990] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <BriefcaseIcon className="h-5 w-5" />
              Ajouter un bagagiste
            </button>

            <div className="flex-grow"></div>

            <div className="flex gap-4">
              <button
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-[#1c75bc] border border-[#1c75bc] hover:border-[#2b3990] transition-colors duration-300"
                onClick={exportToPDF}
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
                PDF
              </button>
              <button
                 className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-[#1c75bc] border border-[#1c75bc] hover:border-[#2b3990] transition-colors duration-300"
                onClick={exportToExcel}
              >
                <TableCellsIcon className="h-5 w-5 " />
                Excel
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-[#1c75bc] hover:border-[#2b3990] transition-colors duration-300">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-[#1c75bc]" />
                </div>
                <h3 className="text-center font-semibold text-gray-800">{stat.title}</h3>
                <p className="text-center text-2xl font-bold text-[#1c75bc]">{stat.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <Paper className="p-4 mt-5">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6">Liste des utilisateurs</Typography>
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
            </div>
          </div>
          {isMobile ? (
            <div className="space-y-4">
              {utilisateurs.map((utilisateur) => (
                <Paper key={utilisateur.id} elevation={2} className="p-4">
                  <Typography variant="h6">{utilisateur.name}</Typography>
                  <Typography>Téléphone : {utilisateur.phone}</Typography>
                  <Typography>Email : {utilisateur.email}</Typography>
                  <Typography>Adresse : {utilisateur.address}</Typography>
                  <div className="flex justify-end mt-2 space-x-2">
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(utilisateur, 'view')}>
                      <Eye size={20} />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(utilisateur, 'edit')}>
                      <Edit size={20} />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleOpenDialog(utilisateur, 'delete')}>
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
                    {['N°', 'Nom', 'Téléphone', 'Email', 'Adresse', 'Role', 'Actions'].map((header) => (
                      <TableCell key={header} sx={{ color: 'white', backgroundColor: '#1c75bc', position: 'sticky', top: 0, zIndex: 2 }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {utilisateurs.slice(0, rowsPerPage).map((utilisateur) => (
                    <TableRow key={utilisateur.id}>
                      <TableCell>{utilisateur.id}</TableCell>
                      <TableCell>{utilisateur.name}</TableCell>
                      <TableCell>{utilisateur.phone}</TableCell>
                      <TableCell>{utilisateur.email}</TableCell>
                      <TableCell>{utilisateur.address}</TableCell>
                      <TableCell>{utilisateur.role}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(utilisateur, 'view')}>
                          <Eye size={20} />
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(utilisateur, 'edit')}>
                          <Edit size={20} />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleOpenDialog(utilisateur, 'delete')}>
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

        <AddUserDialog 
          open={openDialogAddUser} 
          onClose={handleCloseDialogAddUser}
        />

        {/* Modal Bagagiste */}
      {showBagagisteModal && (
      <div className="fixed inset-0 mt-8 bg-black bg-opacity-50 flex items-center justify-center min-h-screen p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ajouter un bagagiste</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom complet</label>
              <input
                type="text"
                className="mt-1 block w-full h-12 rounded-md border border-gray-400 bg-[#f5f5ff] px-4 py-2 shadow-sm focus:border-[#1c75bc] focus:ring focus:ring-[#1c75bc] focus:ring-opacity-50"
                placeholder="Nom complet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                type="tel"
                className="mt-1 block w-full h-12 rounded-md border border-gray-400 bg-[#f5f5ff] px-4 py-2 shadow-sm focus:border-[#1c75bc] focus:ring focus:ring-[#1c75bc] focus:ring-opacity-50"
                placeholder="+243 ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full h-12 rounded-md border border-gray-400 bg-[#f5f5ff] px-4 py-2 shadow-sm focus:border-[#1c75bc] focus:ring focus:ring-[#1c75bc] focus:ring-opacity-50"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Adresse</label>
              <input
                type="text"
                className="mt-1 block w-full h-12 rounded-md border border-gray-400 bg-[#f5f5ff] px-4 py-2 shadow-sm focus:border-[#1c75bc] focus:ring focus:ring-[#1c75bc] focus:ring-opacity-50"
                placeholder="Adresse complète"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setShowBagagisteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1c75bc] text-white rounded-md hover:bg-[#2b3990]"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
      </div>
    </LocalizationProvider>
  );
};

export default UserManagement;