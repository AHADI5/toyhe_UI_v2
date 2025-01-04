import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import logoTOYHE from "../../assets/TOYHE_LOGO_250x250.png"

const columns = [
  { id: "numero", label: "N°", minWidth: 50 },
  { id: "noms", label: "Noms", minWidth: 150 },
  { id: "telephone", label: "Téléphone", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "adresse", label: "Adresse", minWidth: 200 },
  { id: "role", label: "Rôle", minWidth: 150 },
];

const rows = [
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: `KULE WA-KANGIT'SI Robert`, telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°020 Maboke, Q. Kyeshero, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
  {noms: 'ALUHEBA ABECUMBE', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'AMURI TCHALUMBA Héritier', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Kasika, C. Karisimbi', role: "Utilisateur"},
  {noms: 'KIRANGA KANYANGE Prinece', telephone: '+243990691536', email: 'heritieramuritcha@gmail.com', adresse: 'N°049 Dikuta, Q. Himbi, C. Goma', role: 'Agent'},
];

const TableauDesElements = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };





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
  
    // Ajouter un titre au document
    doc.setFillColor("#2b3990");
    doc.rect(10, 10, 190, 8, "F");
    // Ajouter un titre centré en blanc
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text("Liste des utilisateurs", 105, 16, { align: "center" }); 
  
    // Générer le tableau
    autoTable(doc, {
      startY: 20,
      head: [tableColumnHeaders],
      body: tableRows,
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [43, 57, 144],
        textColor: [255, 255, 255],
      },
    });

    
    doc.addImage(logoTOYHE, 'PNG', 10, 280, 10, 10);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Plateforme de gestion et réservation du transport lacustre", 23, 287);
  
    doc.save("Liste_Utilisateurs.pdf");
  };
  
  




  const exportToExcel = () => {


    const tableData = rows.map((row, index) => ({
      "N°": index + 1,
      "Noms": row.noms,
      "Téléphone": row.telephone,
      "Email": row.email,
      "Adresse": row.adresse,
      "Rôle": row.role,
    }));



    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tableau");
    XLSX.writeFile(workbook, "tableau.xlsx");
  };

  return (
    <Paper className="overflow-x-auto tableauDesElement" sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer className="elementTableau" sx={{ maxHeight: 440, overflow: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth, backgroundColor: "#1c75bc", color: "white", fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>



          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.noms}</TableCell>
                <TableCell>{row.telephone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.adresse}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>





        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div>
          <button onClick={exportToPDF} style={{ color: "#1c75bc", background: "none", border: "none", cursor: "pointer" }}>
            Télécharger PDF
          </button>
          <button
            onClick={exportToExcel}
            style={{ color: "#1c75bc", background: "none", border: "none", cursor: "pointer", marginLeft: "16px" }}
          >
            Télécharger Excel
          </button>
        </div>
      </div>
    </Paper>
  );
};

export default TableauDesElements;
