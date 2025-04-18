import PokemonRow from '@/components/PokemonRow';

export default function PokedexTable({ pokemons }: { pokemons: any[] }) {
  return (
    <div>
      {pokemons.map((p) => (
        <PokemonRow key={p.id} pokemon={p} />
      ))}
    </div>
  );
}