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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';

const initialPrices = {
  classes: [
    { id: '1', name: 'Première classe', price: 100, currency: 'USD' },
    { id: '2', name: 'Deuxième classe', price: 75, currency: 'USD' },
    { id: '3', name: 'Troisième classe', price: 50, currency: 'USD' },
    { id: '4', name: 'Quatrième classe', price: 25, currency: 'USD' },
  ],
  cargo: [
    { id: '5', name: 'Cargaison standard', price: 10, currency: 'USD' },
    { id: '6', name: 'Cargaison express', price: 15, currency: 'USD' },
  ],
  luggage: [
    { id: '7', name: 'Bagage standard (jusqu\'à 20kg)', price: 5, currency: 'USD' },
    { id: '8', name: 'Bagage supplémentaire', price: 8, currency: 'USD' },
  ],
};

const currencies = ['USD', 'USD', 'GBP'];

const categoryTitles = {
  classes: 'Classes',
  cargo: 'Cargaison',
  luggage: 'Bagages',
};

function Pricing() {
  const [prices, setPrices] = useState(initialPrices);
  const [isAdmin] = useState(true);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [isNewItem, setIsNewItem] = useState(false);

  const handleEdit = (item, category) => {
    setEditItem(item);
    setEditCategory(category);
    setIsNewItem(false);
    setOpen(true);
  };

  const handleAdd = (category) => {
    setEditItem({
      id: Date.now().toString(),
      name: '',
      price: 0,
      currency: 'USD'
    });
    setEditCategory(category);
    setIsNewItem(true);
    setOpen(true);
  };

  const handleDelete = (itemId, category) => {
    setPrices(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId)
    }));
  };

  const handleSave = () => {
    if (editItem && editCategory) {
      if (isNewItem) {
        setPrices(prev => ({
          ...prev,
          [editCategory]: [...prev[editCategory], editItem]
        }));
      } else {
        setPrices(prev => ({
          ...prev,
          [editCategory]: prev[editCategory].map(item =>
            item.id === editItem.id ? editItem : item
          )
        }));
      }
    }
    setOpen(false);
  };

  const renderPriceTable = (title, items, category) => (
    <div key={category}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {isAdmin && (
          <Tooltip title={`Ajouter un nouveau tarif ${title.toLowerCase()}`}>
            <IconButton
              onClick={() => handleAdd(category)}
              color="primary"
              size="small"
            >
              <Plus />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'black' }}>
              <TableCell sx={{ color: 'white' }}>Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Prix</TableCell>
              <TableCell sx={{ color: 'white' }}>Devise</TableCell>
              {isAdmin && <TableCell sx={{ color: 'white' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.currency}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="small"
                        onClick={() => handleEdit(item, category)}
                      >
                        Modifier
                      </Button>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(item.id, category)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-primary">Tarifs</h2>

      <div className="space-y-6">
        {Object.entries(prices).map(([category, items]) => (
          renderPriceTable(categoryTitles[category], items, category)
        ))}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {isNewItem ? 'Ajouter un nouveau tarif' : 'Modifier le tarif'}
        </DialogTitle>
        <DialogContent>
          {editItem && (
            <div className="pt-4 space-y-4">
              <TextField
                fullWidth
                label="Nom"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Prix"
                type="number"
                value={editItem.price}
                onChange={(e) => setEditItem({ ...editItem, price: parseFloat(e.target.value) })}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Devise</InputLabel>
                <Select
                  value={editItem.currency}
                  onChange={(e) => setEditItem({ ...editItem, currency: e.target.value })}
                  label="Devise"
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            disabled={!editItem?.name || editItem?.price < 0}
          >
            {isNewItem ? 'Ajouter' : 'Sauvegarder'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Pricing;