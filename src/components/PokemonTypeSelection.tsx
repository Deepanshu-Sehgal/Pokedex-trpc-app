'use client';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

export interface PokemonTypeSelectionProps {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
}

const pokemonTypes = [
  'electric',
  'fairy',
  'fighting',
  'fire',
  'grass',
  'ground',
  'normal',
  'poison',
  'rock',
  'water',
];

export const PokemonTypeSelection = ({
  selectedType,
  selectType,
}: PokemonTypeSelectionProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    selectType(value === '' ? undefined : value); 
  };

  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <InputLabel>Pokémon Type</InputLabel>
        <Select
          value={selectedType ?? ''} 
          label="Pokémon Type"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>All Types</em>
          </MenuItem>
          {pokemonTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Typography textTransform="capitalize">{type}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
