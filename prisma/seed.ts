import { PrismaClient } from '@prisma/client';

import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  await prisma.pokemon.deleteMany();
  console.log('✅ Cleared Pokémon data!');
  await prisma.pokemon.createMany({
    data: [
      {
        name: 'Bulbasaur',
        types: ['grass', 'poison'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      },
      {
        name: 'Charmander',
        types: ['fire'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      },
      {
        name: 'Squirtle',
        types: ['water'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      },
      {
        name: 'Pikachu',
        types: ['electric'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      },
      {
        name: 'Jigglypuff',
        types: ['normal', 'fairy'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
      },
      {
        name: 'Meowth',
        types: ['normal'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png',
      },
      {
        name: 'Psyduck',
        types: ['water'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',
      },
      {
        name: 'Machop',
        types: ['fighting'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png',
      },
      {
        name: 'Geodude',
        types: ['rock', 'ground'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png',
      },
      {
        name: 'Magikarp',
        types: ['water'],
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png',
      },
    ],
  });

  console.log('Seeded Pokémon data!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('Error seeding:', e);
    prisma.$disconnect();
    process.exit(1);
  });
