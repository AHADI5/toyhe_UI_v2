
const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumnHeaders = columns.map((col) => col.label); // Récupérer les étiquettes des colonnes
    const tableRows = rows.map((row, index) => [
      index + 1,
      row.noms,
      row.telephone,
      row.email,
      row.adresse,
      row.role,
    ]);
  
    // Ajouter le logo de l'entreprise (entête haut)
    doc.addImage(logoSILIMU, 'PNG', 10, 5, 30, 20); // (logo, format, x, y, largeur, hauteur)
    
    // Ajouter le texte "Le garant du transport lacustre" après le logo
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Texte noir
    doc.text("Le garant du transport lacustre", 50, 15); // Position du texte à côté du logo
  
    // Ajouter un fond pour le titre du tableau
    doc.setFillColor("#2b3990"); // Fond bleu
    doc.rect(10, 10, 190, 8, "F"); // Rectangle pour le titre (position et taille ajustables)
  
    // Ajouter un titre centré en blanc
    doc.setFontSize(16); // Taille de la police
    doc.setTextColor(255, 255, 255); // Texte blanc
    doc.text("Liste des utilisateurs", 105, 16, { align: "center" });
  
    // Générer le tableau
    autoTable(doc, {
      startY: 20,
      head: [tableColumnHeaders],
      body: tableRows,
      styles: {
        fontSize: 10, // Taille de police
      },
      headStyles: {
        fillColor: [43, 57, 144], // Couleur du titre de table
        textColor: [255, 255, 255], // Couleur du texte du titre
      },
    });
  
    // Ajouter le logo de votre entreprise (bas de page)
    doc.addImage(logo, 'PNG', 10, 270, 30, 20); // Position du logo en bas à gauche
  
    // Ajouter le texte "Plateforme de gestion et réservation du transport lacustre"
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Texte noir
    doc.text("Plateforme de gestion et réservation du transport lacustre", 50, 280); // Position du texte à côté du logo
  
    // Enregistrer le PDF
    doc.save("Liste_Utilisateurs.pdf");
  };









import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import logo from "../../assets/logo.png"; // Importez votre logo ici

const columns = [
  { id: "noms", label: "Noms", minWidth: 150 },
  { id: "telephone", label: "Téléphone", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "adresse", label: "Adresse", minWidth: 200 },
  { id: "role", label: "Rôle", minWidth: 150 },
];

const rows = [
  { noms: "Jean Dupont", telephone: "+33 6 12 34 56 78", email: "jean.dupont@example.com", adresse: "Paris, France", role: "Administrateur" },
  { noms: "Marie Curie", telephone: "+33 7 98 76 54 32", email: "marie.curie@example.com", adresse: "Lyon, France", role: "Manager" },
  { noms: "Albert Einstein", telephone: "+33 6 23 45 67 89", email: "albert.einstein@example.com", adresse: "Strasbourg, France", role: "Ingénieur" },
  { noms: "Isaac Newton", telephone: "+33 6 78 90 12 34", email: "isaac.newton@example.com", adresse: "Marseille, France", role: "Technicien" },
  { noms: "Ada Lovelace", telephone: "+33 7 56 78 90 12", email: "ada.lovelace@example.com", adresse: "Bordeaux, France", role: "Développeur" },
];

const TableauDesElements = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fileName, setFileName] = useState("tableau");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const imgWidth = 25; // Adjust image size
    const imgHeight = 25; // Adjust image size
    doc.addImage(logo, "PNG", 10, 10, imgWidth, imgHeight);
    doc.text("Tableau des Éléments", 20, 70); // Adjust text position below the logo
    const tableData = rows.map((row) => [row.noms, row.telephone, row.email, row.adresse, row.role]);
    autoTable(doc, {
      startY: 80, // Position the table below the header
      head: [["Noms", "Téléphone", "Email", "Adresse", "Rôle"]],
      body: tableData,
    });
    doc.save(`${fileName}.pdf`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tableau");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align="left">
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div style={{ display: "flex", flexDirection: "column", margin: 16 }}>
        <TextField
          label="Nom du fichier"
          variant="outlined"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownloadIcon />}
            onClick={exportToPDF}
            style={{ marginRight: 10 }}
          >
            Télécharger PDF
          </Button>
          <Button variant="contained" color="secondary" onClick={exportToExcel}>
            Télécharger Excel
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default TableauDesElements;
