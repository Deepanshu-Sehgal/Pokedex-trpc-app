'use client';

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Chip,
} from '@mui/material';

const typeColors: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'> = {
  fire: 'error',
  water: 'primary',
  grass: 'success',
  electric: 'warning',
  psychic: 'secondary',
  normal: 'default',
  fighting: 'warning',
  fairy: 'secondary',
  rock: 'default',
  ground: 'warning',
  poison: 'secondary',
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function PokemonRow({ pokemon }: { pokemon: any }) {
  return (
    <Card
      elevation={4}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 3,
        p: 2,
        maxWidth: 600,
        mx: 'auto',
        mt: 3,
        borderRadius: 4,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={pokemon.sprite || '/pokeball.png'}
        alt={pokemon.name}
        sx={{
          width: { xs: '100%', sm: 200 },
          height: { xs: 200, sm: 200 },
          objectFit: 'contain',
          borderRadius: 2,
          background: '#f5f5f5',
        }}
      />

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" component="div" fontWeight={600} gutterBottom>
          {capitalize(pokemon.name)}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ID: {pokemon.id}
        </Typography>

        <Box mt={2} display="flex" gap={1} flexWrap="wrap">
          {pokemon.types.map((type: string) => (
            <Chip
              key={type}
              label={capitalize(type)}
              color={typeColors[type] || 'default'}
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
