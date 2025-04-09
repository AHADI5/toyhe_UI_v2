import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialBoats = [
  {
    id: 1,
    name: 'Emmanuel 1',
    status: 'en navigation',
    seats: { first: 50, second: 75, third: 100, fourth: 150 },
    remainingCargo: 2000,
    departure: '08:00',
    arrival: '16:00',
    capacity: 5000,
    details: 'Navire principal avec commodités premium',
    active: true
  },
  {
    id: 2,
    name: 'Emmanuel 2',
    status: 'au quai',
    seats: { first: 45, second: 80, third: 90, fourth: 140 },
    remainingCargo: 3000,
    departure: '09:00',
    arrival: '17:00',
    capacity: 4500,
    details: 'Navire secondaire pour trajets courts',
    active: true
  },
  {
    id: 3,
    name: 'MV/IKO 1',
    status: 'en navigation',
    seats: { first: 40, second: 60, third: 80, fourth: 120 },
    remainingCargo: 1500,
    departure: '07:30',
    arrival: '15:30',
    capacity: 3500,
    details: 'Barge rapide pour transport mixte',
    active: true
  }
];

const emptyBoat = {
  name: '',
  status: 'au quai',
  seats: { first: 0, second: 0, third: 0, fourth: 0 },
  remainingCargo: 0,
  departure: '',
  arrival: '',
  capacity: 0,
  details: '',
  active: true
};

function Boats() {
  const [boats, setBoats] = useState(initialBoats);
  const [isAdmin] = useState(true);
  const [open, setOpen] = useState(false);
  const [editBoat, setEditBoat] = useState(null);
  const [isNewBoat, setIsNewBoat] = useState(false);

  const handleEdit = (boat) => {
    setEditBoat(boat);
    setIsNewBoat(false);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditBoat({ ...emptyBoat, id: Math.max(...boats.map(b => b.id)) + 1 });
    setIsNewBoat(true);
    setOpen(true);
  };

  const handleSave = () => {
    if (editBoat) {
      if (isNewBoat) {
        setBoats([...boats, editBoat]);
      } else {
        setBoats(boats.map(b => b.id === editBoat.id ? editBoat : b));
      }
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setBoats(boats.map(b => b.id === id ? { ...b, active: false } : b));
  };

  const getStatusColor = (status) => {
    return status === 'en navigation' ? 'primary' : 'success';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Gestion des Bateaux</h2>
        {isAdmin && (
          <Fab color="primary" aria-label="add" onClick={handleAdd}>
            <AddIcon />
          </Fab>
        )}
      </div>

      <Grid container spacing={4}>
        {boats.filter(boat => boat.active).map((boat) => (
          <Grid item xs={12} md={6} key={boat.id}>
            <Card className="h-full">
              <CardContent>
                <div className="flex justify-between items-start">
                  <Typography variant="h5" component="h3" className="text-primary">
                    {boat.name}
                  </Typography>
                  <div className="flex gap-2">
                    <Chip 
                      label={boat.status} 
                      color={getStatusColor(boat.status)}
                      size="small"
                    />
                    {isAdmin && (
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDelete(boat.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Typography variant="body1">
                    <strong>Places disponibles:</strong>
                  </Typography>
                  <div className="grid grid-cols-2 gap-2">
                    <div>1ère classe: {boat.seats.first}</div>
                    <div>2ème classe: {boat.seats.second}</div>
                    <div>3ème classe: {boat.seats.third}</div>
                    <div>4ème classe: {boat.seats.fourth}</div>
                  </div>

                  <Typography>
                    <strong>Charge restante:</strong> {boat.remainingCargo} kg
                  </Typography>

                  <Typography>
                    <strong>Départ:</strong> {boat.departure} | <strong>Arrivée:</strong> {boat.arrival}
                  </Typography>

                  <Typography>
                    <strong>Capacité totale:</strong> {boat.capacity} kg
                  </Typography>

                  <Typography>
                    <strong>Détails:</strong> {boat.details}
                  </Typography>

                  {isAdmin && (
                    <Button 
                      variant="outlined" 
                      color="primary"
                      onClick={() => handleEdit(boat)}
                      className="mt-4"
                    >
                      Modifier
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{isNewBoat ? 'Ajouter un bateau' : 'Modifier le bateau'}</DialogTitle>
        <DialogContent>
          {editBoat && (
            <div className="space-y-4 pt-4">
              <TextField
                fullWidth
                label="Nom"
                value={editBoat.name}
                onChange={(e) => setEditBoat({ ...editBoat, name: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editBoat.status}
                  label="Status"
                  onChange={(e) => setEditBoat({ ...editBoat, status: e.target.value })}
                >
                  <MenuItem value="en navigation">En navigation</MenuItem>
                  <MenuItem value="au quai">Au quai</MenuItem>
                </Select>
              </FormControl>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Places 1ère classe"
                  type="number"
                  value={editBoat.seats.first}
                  onChange={(e) => setEditBoat({
                    ...editBoat,
                    seats: { ...editBoat.seats, first: parseInt(e.target.value) }
                  })}
                />
                <TextField
                  label="Places 2ème classe"
                  type="number"
                  value={editBoat.seats.second}
                  onChange={(e) => setEditBoat({
                    ...editBoat,
                    seats: { ...editBoat.seats, second: parseInt(e.target.value) }
                  })}
                />
                <TextField
                  label="Places 3ème classe"
                  type="number"
                  value={editBoat.seats.third}
                  onChange={(e) => setEditBoat({
                    ...editBoat,
                    seats: { ...editBoat.seats, third: parseInt(e.target.value) }
                  })}
                />
                <TextField
                  label="Places 4ème classe"
                  type="number"
                  value={editBoat.seats.fourth}
                  onChange={(e) => setEditBoat({
                    ...editBoat,
                    seats: { ...editBoat.seats, fourth: parseInt(e.target.value) }
                  })}
                />
              </div>
              <TextField
                fullWidth
                label="Charge restante (kg)"
                type="number"
                value={editBoat.remainingCargo}
                onChange={(e) => setEditBoat({ ...editBoat, remainingCargo: parseInt(e.target.value) })}
              />
              <TextField
                fullWidth
                label="Capacité totale (kg)"
                type="number"
                value={editBoat.capacity}
                onChange={(e) => setEditBoat({ ...editBoat, capacity: parseInt(e.target.value) })}
              />
              <TextField
                fullWidth
                label="Heure de départ"
                value={editBoat.departure}
                onChange={(e) => setEditBoat({ ...editBoat, departure: e.target.value })}
              />
              <TextField
                fullWidth
                label="Heure d'arrivée"
                value={editBoat.arrival}
                onChange={(e) => setEditBoat({ ...editBoat, arrival: e.target.value })}
              />
              <TextField
                fullWidth
                label="Détails"
                multiline
                rows={3}
                value={editBoat.details}
                onChange={(e) => setEditBoat({ ...editBoat, details: e.target.value })}
              />
            </div>
          )}
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

export default Boats;