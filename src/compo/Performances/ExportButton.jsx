import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ExportButton = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Titre
    doc.setFontSize(16);
    doc.text('Rapport de Performance', 14, 15);
    
    // Données
    const tableData = [
      ['Métrique', 'Valeur'],
      ['Taux d\'occupation', `${data.occupancyRate}%`],
      ['Commandes en ligne', data.onlineOrders],
      ['Ventes directes', data.directSales],
      ['Recettes totales', `${data.totalRevenue}€`],
    ];

    doc.autoTable({
      startY: 25,
      head: [['Métrique', 'Valeur']],
      body: tableData.slice(1),
    });

    doc.save('rapport-performance.pdf');
    handleClose();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        'Taux d\'occupation': `${data.occupancyRate}%`,
        'Commandes en ligne': data.onlineOrders,
        'Ventes directes': data.directSales,
        'Recettes totales': `${data.totalRevenue}€`,
      }
    ]);
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Performances');
    XLSX.writeFile(wb, 'rapport-performance.xlsx');
    
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<FileDownloadIcon />}
        onClick={handleClick}
        className="bg-[#1c75bc] hover:bg-[#2b3990]"
      >
        Exporter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={exportToPDF}>Format PDF</MenuItem>
        <MenuItem onClick={exportToExcel}>Format Excel</MenuItem>
      </Menu>
    </>
  );
};

export default ExportButton;