import { z } from 'zod';
import { router, publicProcedure } from '../trpc-init';
import { prisma } from '../db';

export const pokemonRouter = router({
    getByName: publicProcedure
  .input(z.string())
  .query(async (opts) => {
    const { input } = opts;
    const pokemon = await prisma.pokemon.findUnique({
      where: { name: input }
    });

    if (!pokemon) {
      throw new Error(`Pokemon "${input}" not found`);
    }

    return pokemon;
  }),
  getAll: publicProcedure.query(() =>
    prisma.pokemon.findMany()
  ),  
  getByNames: publicProcedure.input(z.array(z.string())).query(({ input }) =>
    prisma.pokemon.findMany({ where: { name: { in: input } } })
  ),
  getByType: publicProcedure.input(z.string()).query(({ input }) =>
    prisma.pokemon.findMany({ where: { types: { has: input } } })
  )
});