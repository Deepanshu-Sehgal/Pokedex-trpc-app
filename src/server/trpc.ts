
import { router } from './trpc-init';
import { pokemonRouter } from './routers/pokemon';

export const appRouter = router({
  pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;
