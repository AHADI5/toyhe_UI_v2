import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  InputAdornment,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { colors } from '../../theme/colors';

const getStatusColor = (status) => {
  switch (status) {
    case 'En attente':
      return colors.warning;
    case 'Validé':
      return colors.primary;
    case 'Refusé':
      return colors.danger;
    default:
      return colors.primary;
  }
};

const RapportList = ({ rapports, onViewRapport, isAdmin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRapports = [...rapports]
    .filter(rapport => 
      (statusFilter === '' || rapport.status === statusFilter) &&
      (searchTerm === '' || 
        rapport.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (isAdmin && rapport.agent.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => {
      if (orderBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (orderBy === 'titre') {
        return order === 'asc' 
          ? a.titre.localeCompare(b.titre)
          : b.titre.localeCompare(a.titre);
      } else if (orderBy === 'agent' && isAdmin) {
        return order === 'asc'
          ? a.agent.localeCompare(b.agent)
          : b.agent.localeCompare(a.agent);
      }
      return 0;
    });

  if (isMobile) {
    return (
      <Box sx={{ mt: 2 }}>
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            placeholder="Rechercher..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small">
            <InputLabel id="status-filter-label">Statut</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Statut"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="En attente">En attente</MenuItem>
              <MenuItem value="Validé">Validé</MenuItem>
              <MenuItem value="Refusé">Refusé</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        {sortedRapports.map((rapport) => (
          <Paper
            key={rapport.id}
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: 'white',
              borderRadius: 2
            }}
          >
            <Typography variant="subtitle1" sx={{ color: colors.secondary, fontWeight: 'bold' }}>
              {rapport.titre}
            </Typography>
            {isAdmin && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Par: {rapport.agent}
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Chip
                label={rapport.status}
                sx={{
                  backgroundColor: getStatusColor(rapport.status),
                  color: 'white'
                }}
                size="small"
              />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {format(new Date(rapport.date), 'dd/MM/yyyy', { locale: fr })}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <IconButton
                onClick={() => onViewRapport(rapport)}
                sx={{ color: colors.primary }}
              >
                <VisibilityIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Rechercher..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="status-filter-label">Statut</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Statut"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="En attente">En attente</MenuItem>
            <MenuItem value="Validé">Validé</MenuItem>
            <MenuItem value="Refusé">Refusé</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.background }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'titre'}
                  direction={orderBy === 'titre' ? order : 'asc'}
                  onClick={() => handleRequestSort('titre')}
                >
                  Titre
                </TableSortLabel>
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'agent'}
                    direction={orderBy === 'agent' ? order : 'asc'}
                    onClick={() => handleRequestSort('agent')}
                  >
                    Agent
                  </TableSortLabel>
                </TableCell>
              )}
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => handleRequestSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRapports.map((rapport) => (
              <TableRow key={rapport.id}>
                <TableCell>{rapport.titre}</TableCell>
                {isAdmin && <TableCell>{rapport.agent}</TableCell>}
                <TableCell>
                  {format(new Date(rapport.date), 'dd/MM/yyyy', { locale: fr })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={rapport.status}
                    sx={{
                      backgroundColor: getStatusColor(rapport.status),
                      color: 'white'
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onViewRapport(rapport)}
                    sx={{ color: colors.primary }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RapportList;