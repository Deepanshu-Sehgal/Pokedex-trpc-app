
'use client';

import { useState, useMemo, useEffect, useContext } from 'react';
import { trpc } from '@/lib/trpc';
import { PokemonTypeSelection } from '@/components/PokemonTypeSelection';
import PokemonRow from '@/components/PokemonRow';
import {
  Box,
  Pagination,
  Typography,
  TextField,
  CircularProgress,
  Fade,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
import type { Pokemon } from '@prisma/client';

const ITEMS_PER_PAGE = 6;

interface FilterablePokedexTableProps {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
}

export default function FilterablePokedexTable({
  selectedType,
  selectType,
}: FilterablePokedexTableProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const getAllQuery = trpc.pokemon.getAll.useQuery(undefined, {
    enabled: selectedType === undefined,
  });

  const getByTypeQuery = trpc.pokemon.getByType.useQuery(selectedType!, {
    enabled: !!selectedType,
  });

  const query = selectedType ? getByTypeQuery : getAllQuery;

  const filtered = useMemo(() => {
    if (!query.data) return [];
    return (query.data as Pokemon[]).filter((poke: Pokemon) =>
      poke.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [query.data, search]);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  if (query.isLoading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress size={48} thickness={4.5} />
      </Box>
    );
  }

  return (
    <Box
    
      mt={4}
      sx={{
    
        p: { xs: 2, md: 4 },
        borderRadius: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          background: isDark
            ? 'linear-gradient(145deg, #1e1e1e, #2a2a2a)'
            : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,240,240,0.85))',
          boxShadow: isDark
            ? '0 8px 20px rgba(0, 0, 0, 0.5)'
            : '0 8px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1} color="primary">
          Filter & Search Pokémon
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Browse by type or search by name below
        </Typography>

        <PokemonTypeSelection
          selectedType={selectedType}
          selectType={(type) => {
            setSearch('');
            selectType(type);
          }}
        />

        <TextField
          fullWidth
          label="Search by name"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          sx={{ mt: 3, mb: 3 }}
        />

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" mb={2}>
          Showing {paginated.length} of {filtered.length} Pokémon
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {paginated.map((pokemon, index) => (
            <Fade in timeout={400 + index * 100} key={pokemon.id}>
              <Box
                flexBasis={{ xs: '100%', sm: '48%', md: '30%' }}
                sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}
              >
                <PokemonRow pokemon={pokemon} />
              </Box>
            </Fade>
          ))}
        </Box>

        {totalPages > 1 && (
          <Box mt={5} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
              size="large"
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
}