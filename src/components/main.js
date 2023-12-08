import React from 'react';
import { usePokemonContext } from '../PokemonContext.js';

const Main = () => {
  const { pokemonList } = usePokemonContext();

  return (
    <div className="main">
      <h2>Liste des Pokémon</h2>
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name.en} />
            <p>{pokemon.name.en}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
