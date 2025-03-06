import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const initialSchedule = {
  lundi: { 
    morning: ['Emmanuel 1', 'MV/IKO 1'], 
    evening: ['Emmanuel 2', 'MV/IKO 2'] 
  },
  mardi: { 
    morning: ['Emmanuel 3'], 
    evening: ['MV/IKO 1', 'Emmanuel 1'] 
  },
  mercredi: { 
    morning: ['Emmanuel 4', 'MV/IKO 2'], 
    evening: ['MV/IKO 2'] 
  },
  jeudi: { 
    morning: ['Emmanuel 1'], 
    evening: ['MV/IKO 3', 'Emmanuel 2'] 
  },
  vendredi: { 
    morning: ['Emmanuel 2', 'MV/IKO 1'], 
    evening: ['Emmanuel 3'] 
  },
  samedi: { 
    morning: ['Emmanuel 4'], 
    evening: ['MV/IKO 1', 'Emmanuel 1'] 
  },
  dimanche: { 
    morning: ['MV/IKO 2'], 
    evening: ['MV/IKO 3'] 
  },
};

const vessels = [
  'Emmanuel 1', 'Emmanuel 2', 'Emmanuel 3', 'Emmanuel 4',
  'MV/IKO 1', 'MV/IKO 2', 'MV/IKO 3'
];

function Schedule() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isAdmin] = useState(true);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({ 
    day: '', 
    period: '', 
    vessels: [] 
  });

  const handleEdit = (day, period, currentVessels) => {
    setEditData({ day, period, vessels: [...currentVessels] });
    setOpen(true);
  };

  const handleAddVessel = () => {
    setEditData(prev => ({
      ...prev,
      vessels: [...prev.vessels, '']
    }));
  };

  const handleRemoveVessel = (index) => {
    setEditData(prev => ({
      ...prev,
      vessels: prev.vessels.filter((_, i) => i !== index)
    }));
  };

  const handleVesselChange = (index, value) => {
    setEditData(prev => ({
      ...prev,
      vessels: prev.vessels.map((v, i) => i === index ? value : v)
    }));
  };

  const handleSave = () => {
    setSchedule(prev => ({
      ...prev,
      [editData.day]: {
        ...prev[editData.day],
        [editData.period]: editData.vessels.filter(v => v !== '')
      }
    }));
    setOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-primary">Horaire des Voyages</h2>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1c75bc' }}>
              <TableCell sx={{ color: 'white' }}>Jour</TableCell>
              <TableCell sx={{ color: 'white' }}>Matin</TableCell>
              <TableCell sx={{ color: 'white' }}>Soir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(schedule).map(([day, times]) => (
              <TableRow key={day}>
                <TableCell className="capitalize">{day}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-2">
                    {times.morning.map((vessel, index) => (
                      <Chip 
                        key={`${vessel}-${index}`}
                        label={vessel}
                        color="primary"
                        size="small"
                      />
                    ))}
                    {isAdmin && (
                      <Button 
                        size="small" 
                        onClick={() => handleEdit(day, 'morning', times.morning)}
                        className="ml-2"
                      >
                        Modifier
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-2">
                    {times.evening.map((vessel, index) => (
                      <Chip 
                        key={`${vessel}-${index}`}
                        label={vessel}
                        color="primary"
                        size="small"
                      />
                    ))}
                    {isAdmin && (
                      <Button 
                        size="small" 
                        onClick={() => handleEdit(day, 'evening', times.evening)}
                        className="ml-2"
                      >
                        Modifier
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Modifier l'horaire</DialogTitle>
        <DialogContent>
          <div className="pt-4 space-y-4">
            {editData.vessels.map((vessel, index) => (
              <div key={index} className="flex items-center gap-2">
                <FormControl fullWidth>
                  <InputLabel>Bateau</InputLabel>
                  <Select
                    value={vessel}
                    onChange={(e) => handleVesselChange(index, e.target.value)}
                    label="Bateau"
                  >
                    {vessels.map((v) => (
                      <MenuItem key={v} value={v}>{v}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton 
                  color="error" 
                  onClick={() => handleRemoveVessel(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddVessel}
              variant="outlined"
              fullWidth
            >
              Ajouter un bateau
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Schedule;