import React from 'react';
import { usePokemonContext } from '../PokemonContext';

const Main = () => {
  const { pokemonList, types } = usePokemonContext();

  return (
    <div className="main">
      <h2>Liste des Pokémon</h2>
      <ul className="pokemon-grid">
        {pokemonList.map(pokemon => (
          <li key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name.en} />
            <p>{`${pokemon.name.en} #${pokemon.id}`}</p>
            <p>Génération {pokemon.generation}</p>
            <div className="pokemon-types">
              {pokemon.types.map(typeId => {
                const type = types.find(t => t.id === typeId);
                return (
                  <div key={type.id} className="pokemon-type">
                    <img src={type.image} alt={type.name.en} />
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
