import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { getWeek } from 'date-fns';
import SearchBox from '../Header/SearchBox';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddUserDialog from '../AddUserDialog';


registerLocale('fr', fr);

const FiltresDeResultats = () => {
  const [critereDeSelection, setCritereDeSelection] = useState('Année');
  const [valeurSelectionnee, setValeurSelectionnee] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangeCritereDeSelection = (event) => {
    setCritereDeSelection(event.target.value);
    setValeurSelectionnee(null); // Réinitialiser la valeur sélectionnée
  };

  const handleDateChange = (date) => {
    setValeurSelectionnee(date);
    setOpenCalendar(false); // Fermer le calendrier après la sélection
  };

  const handleClickCalendar = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenCalendar((prev) => !prev); // Basculer l'affichage du calendrier
  };

  const getFormattedValue = () => {
    if (!valeurSelectionnee) return 'Sélectionnez une valeur';

    if (critereDeSelection === 'Semaine') {
      const semaine = getWeek(valeurSelectionnee); // Utiliser getWeek de date-fns
      return `Semaine ${semaine} de ${valeurSelectionnee.getFullYear()}`;
    }

    return valeurSelectionnee.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: critereDeSelection === 'Mois' ? 'long' : undefined,
      day: critereDeSelection === 'Jour' ? 'numeric' : undefined,
    });
  };

   // Pour l'ordre de filtrage
   const [ordreDeFiltrage, setOrdreDeFiltrage] = useState('');

   const handleChangeOrdreDeFiltrage = (event) => {
       setOrdreDeFiltrage(event.target.value);
   }

   const [openDialogAddUser, setOpenDialogAddUser] = useState(false);
   
     const handleOpenDialogAddUser = () => {
       setOpenDialogAddUser(true);
     };
   
     const handleCloseDialogAddUser = () => {
       setOpenDialogAddUser(false);
     };





  return (
    <div className="filtresDeResultat rowfiltresDeResultat">
      {/* Case de sélection du critère */}
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="critereDeSelectionLabel">Critère</InputLabel>
        <Select
          labelId="critereDeSelectionLabel"
          id="critereDeSelection"
          value={critereDeSelection}
          label="Critère"
          onChange={handleChangeCritereDeSelection}
        >
          <MenuItem value="Année">Année</MenuItem>
          <MenuItem value="Mois">Mois</MenuItem>
          <MenuItem value="Semaine">Semaine</MenuItem>
          <MenuItem value="Jour">Jour</MenuItem>
        </Select>
      </FormControl>
      

      {/* Case de sélection ou affichage basé sur le critère */}
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="valeurSelectionneeLabel">
          {critereDeSelection === 'Année' ? 'Sélectionnez une année' : 'Choisissez une date'}
        </InputLabel>
        <Select
          labelId="valeurSelectionneeLabel"
          id="valeurSelectionnee"
          value={critereDeSelection === 'Année' ? valeurSelectionnee || '' : getFormattedValue()}
          label="Valeur sélectionnée"
          onClick={critereDeSelection === 'Année' ? undefined : handleClickCalendar}
          onChange={(e) => {
            if (critereDeSelection === 'Année') setValeurSelectionnee(e.target.value);
          }}
        >
          {critereDeSelection === 'Année' &&
            Array.from({ length: 10 }, (_, i) => (
              <MenuItem key={i} value={new Date().getFullYear() + i}>
                {new Date().getFullYear() + i}
              </MenuItem>
            ))}
          {critereDeSelection !== 'Année' && (
            <MenuItem value={getFormattedValue()}>{getFormattedValue()}</MenuItem>
          )}
        </Select>
        {critereDeSelection !== 'Année' && (
          <Popper open={openCalendar} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1300 }}>
            <ClickAwayListener onClickAway={() => setOpenCalendar(false)}>
              <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                <DatePicker
                  selected={valeurSelectionnee}
                  onChange={handleDateChange}
                  dateFormat={
                    critereDeSelection === 'Mois'
                      ? 'MMMM yyyy'
                      : critereDeSelection === 'Semaine'
                      ? "wo 'semaine de' MMMM yyyy"
                      : 'dd MMMM yyyy'
                  }
                  showMonthYearPicker={critereDeSelection === 'Mois'}
                  showWeekNumbers={critereDeSelection === 'Semaine'}
                  locale="fr"
                  inline
                />
              </Box>
            </ClickAwayListener>
          </Popper>
        )}
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="ordreDeFiltrageLabel">Critère de sélection</InputLabel>
            <Select
            labelId="ordreDeFiltrageLabel"
            id="ordreDeFiltrage"
            value={ordreDeFiltrage}
            label="Ordre d'affichage"
            onChange={handleChangeOrdreDeFiltrage}
            >
              <MenuItem value={`Croissant`}>Croissant</MenuItem>
              <MenuItem value={`Décroissant`}>Décroissant</MenuItem>
            </Select>
        </FormControl>

        <div className='flex items-center'>
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenDialogAddUser}
              sx={{
                bgcolor: '#1c75bc',
                '&:hover': {
                  bgcolor: '#1c75bc',
                  opacity: 0.9
                }
              }}
            >
              Ajouter un utilisateur
            </Button>
        </div>

        <AddUserDialog 
          open={openDialogAddUser} 
          onClose={handleCloseDialogAddUser}
        />


    </div>
  );
};

export default FiltresDeResultats;
