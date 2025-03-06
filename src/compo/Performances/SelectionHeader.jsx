import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Typography,
  Stack
} from '@mui/material';
import { format, startOfWeek, endOfWeek, addWeeks } from 'date-fns';
import { fr } from 'date-fns/locale';
import { boats, boatClasses } from './mockData';

const SelectionHeader = ({ 
  selectedBoat, 
  setSelectedBoat,
  period,
  setPeriod,
  periodValue,
  setPeriodValue,
  boatClass,
  setBoatClass
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Réinitialiser les valeurs lors du changement de période
  useEffect(() => {
    setPeriodValue('');
  }, [period, setPeriodValue]);

  // Styles personnalisés pour les Select
  const selectStyles = {
    root: {
      color: '#2b3990',
    },
    select: {
      '&.MuiInputBase-input': {
        color: '#2b3990',
      }
    },
    icon: {
      color: '#2b3990',
    }
  };

  // Générer les options de période en fonction du type sélectionné
  const getPeriodOptions = () => {
    const currentYear = new Date().getFullYear();

    switch (period) {
      case 'year':
        return Array.from({ length: 5 }, (_, i) => ({
          value: `${currentYear - i}`,
          label: String(currentYear - i)
        }));

      case 'month': {
        const selectedYearInt = parseInt(selectedYear, 10);
        return Array.from({ length: 12 }, (_, i) => {
          const date = new Date(selectedYearInt, i, 1);
          return {
            value: format(date, 'yyyy-MM'),
            label: format(date, 'MMMM yyyy', { locale: fr })
          };
        });
      }

      case 'week': {
        const weeks = [];
        const date = new Date(selectedYear, selectedMonth - 1, 1);
        const firstDayOfMonth = startOfWeek(date, { weekStartsOn: 1 });
        
        // Générer 6 semaines à partir du début du mois
        for (let i = 0; i < 6; i++) {
          const weekStart = addWeeks(firstDayOfMonth, i);
          const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
          
          weeks.push({
            value: format(weekStart, 'yyyy-MM-dd'),
            label: `${format(weekStart, 'dd')} - ${format(weekEnd, 'dd MMMM yyyy', { locale: fr })}`
          });
        }
        return weeks;
      }

      case 'day': {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(selectedYear, selectedMonth - 1, i + 1);
          return {
            value: format(date, 'yyyy-MM-dd'),
            label: format(date, 'EEEE dd MMMM yyyy', { locale: fr })
          };
        });
      }

      default:
        return [];
    }
  };

  // Gérer le changement d'année
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setPeriodValue('');
  };

  // Gérer le changement de mois
  const handleMonthChange = (monthValue) => {
    const [year, month] = monthValue.split('-');
    setSelectedYear(year);
    setSelectedMonth(parseInt(month, 10));
    setPeriodValue('');
  };

  return (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} md={3}>
        <Paper className="p-4 bg-white">
          <img 
            src={boats.find(b => b.id === selectedBoat)?.image} 
            alt={boats.find(b => b.id === selectedBoat)?.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <Typography variant="h6" className="text-[#2b3990] text-center mb-4">
            {boats.find(b => b.id === selectedBoat)?.name || 'Sélectionnez un bateau'}
          </Typography>
          <Stack spacing={2}>
            <FormControl size="small" fullWidth>
              <InputLabel sx={{ color: '#2b3990' }}>Bateau</InputLabel>
              <Select
                value={selectedBoat}
                onChange={(e) => setSelectedBoat(e.target.value)}
                label="Bateau"
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        color: '#2b3990',
                      }
                    }
                  }
                }}
              >
                {boats.map(boat => (
                  <MenuItem key={boat.id} value={boat.id}>{boat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel sx={{ color: '#2b3990' }}>Période</InputLabel>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                label="Période"
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        color: '#2b3990',
                      }
                    }
                  }
                }}
              >
                <MenuItem value="year">Par année</MenuItem>
                <MenuItem value="month">Par mois</MenuItem>
                <MenuItem value="week">Par semaine</MenuItem>
                <MenuItem value="day">Par jour</MenuItem>
              </Select>
            </FormControl>

            {period === 'month' && (
              <FormControl size="small" fullWidth>
                <InputLabel sx={{ color: '#2b3990' }}>Année</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  label="Année"
                  sx={selectStyles}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root': {
                          color: '#2b3990',
                        }
                      }
                    }
                  }}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <MenuItem key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {(period === 'week' || period === 'day') && (
              <>
                <FormControl size="small" fullWidth>
                  <InputLabel sx={{ color: '#2b3990' }}>Année</InputLabel>
                  <Select
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    label="Année"
                    sx={selectStyles}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          '& .MuiMenuItem-root': {
                            color: '#2b3990',
                          }
                        }
                      }
                    }}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <MenuItem key={i} value={new Date().getFullYear() - i}>
                        {new Date().getFullYear() - i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                  <InputLabel sx={{ color: '#2b3990' }}>Mois</InputLabel>
                  <Select
                    value={`${selectedYear}-${String(selectedMonth).padStart(2, '0')}`}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    label="Mois"
                    sx={selectStyles}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          '& .MuiMenuItem-root': {
                            color: '#2b3990',
                          }
                        }
                      }
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const date = new Date(selectedYear, i, 1);
                      return (
                        <MenuItem 
                          key={i} 
                          value={format(date, 'yyyy-MM')}
                        >
                          {format(date, 'MMMM', { locale: fr })}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </>
            )}

            <FormControl size="small" fullWidth>
              <InputLabel sx={{ color: '#2b3990' }}>Valeur de la période</InputLabel>
              <Select
                value={periodValue}
                onChange={(e) => setPeriodValue(e.target.value)}
                label="Valeur de la période"
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        color: '#2b3990',
                      }
                    }
                  }
                }}
              >
                {getPeriodOptions().map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel sx={{ color: '#2b3990' }}>Classe</InputLabel>
              <Select
                value={boatClass}
                onChange={(e) => setBoatClass(e.target.value)}
                label="Classe"
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        color: '#2b3990',
                      }
                    }
                  }
                }}
              >
                {boatClasses.map((className, index) => (
                  <MenuItem key={index} value={index}>{className}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper className="p-4 bg-white h-full">
          <Typography variant="h6" className="mb-4 text-[#2b3990]">
            Vue d'ensemble
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-4">
            Sélectionnez un bateau et une période pour visualiser les statistiques détaillées.
            Les données affichées s'adapteront automatiquement à vos critères de sélection.
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-4">
            Le système vous permet d'analyser les performances selon différentes périodes :
          </Typography>
          <ul className="list-disc pl-6 text-gray-600">
            <li className="mb-2">
              <strong>Année :</strong> Vue globale des performances sur une année complète
            </li>
            <li className="mb-2">
              <strong>Mois :</strong> Analyse détaillée des performances mensuelles
            </li>
            <li className="mb-2">
              <strong>Semaine :</strong> Suivi hebdomadaire du lundi au dimanche
            </li>
            <li className="mb-2">
              <strong>Jour :</strong> Analyse précise des performances journalières
            </li>
          </ul>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SelectionHeader;