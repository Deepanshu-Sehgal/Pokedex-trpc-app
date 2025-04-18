"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PokemonRow from "@/components/PokemonRow";
import {
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";

export default function SearchByName() {
  const [input, setInput] = useState("");
  const [queryName, setQueryName] = useState<string | null>(null);

  const query = trpc.pokemon.getByName.useQuery(queryName!, {
    enabled: !!queryName,
    retry: false,
  });

  const handleSubmit = () => {
    if (input.trim()) {
      setQueryName(input.trim());
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Pokédex Lookup
      </Typography>

      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          label="Enter Pokémon Name"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!input.trim()}
        >
          Search
        </Button>
      </Box>

      <Box mt={4} mb={2} textAlign="center">
        {query.isLoading && <CircularProgress />}

        {!query.isLoading && query.error && queryName && (
          <Box>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Pokéball"
              width={100}
              height={100}
              style={{ opacity: 0.6 }}
            />
            <Alert severity="error" sx={{ mt: 2, maxWidth: 400, mx: "auto" }}>
              {query.error.message || "Pokémon not found!"}
            </Alert>
          </Box>
        )}

        {!query.isLoading && query.data && <PokemonRow pokemon={query.data} />}
      </Box>
    </Container>
  );
}
