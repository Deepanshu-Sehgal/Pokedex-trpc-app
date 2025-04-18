"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PokedexTable from "@/components/PokedexTable";
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Box,
  Alert,
  Paper,
  Fade,
} from "@mui/material";

export default function ByArray() {
  const [names, setNames] = useState("Bulbasaur,Charmander");
  const nameArray = names
    .split(",")
    .map((n) => n.trim())
    .filter((n) => n);

  const query = trpc.pokemon.getByNames.useQuery(nameArray, {
    enabled: nameArray.length > 0,
  });

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={700}
            textAlign="center"
            color="primary"
          >
            🔍 Search Pokémon by Name List
          </Typography>

          <TextField
            fullWidth
            label="Enter comma-separated Pokémon names"
            variant="outlined"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            sx={{ mt: 3, mb: 4 }}
          />

          <Box textAlign="center">
            {query.isLoading && <CircularProgress size={48} thickness={4.5} />}
            {!query.isLoading && query.error && (
              <Alert severity="error">{query.error.message}</Alert>
            )}

            {!query.isLoading && query.data && query.data.length > 0 && (
              <Fade in timeout={500}>
                <Box>
                  <PokedexTable pokemons={query.data} />
                </Box>
              </Fade>
            )}

            {!query.isLoading && query.data?.length === 0 && (
              <Typography variant="body1" color="text.secondary">
                No Pokémon found for the given names.
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
