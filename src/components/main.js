import React, { useState } from 'react';
import { usePokemonContext } from '../PokemonContext';

const Main = () => {
  const { pokemonList, types } = usePokemonContext();
  const [sortedPokemonList, setSortedPokemonList] = useState([...pokemonList]);

  const handleSort = (property) => {
    let sortedList = [...sortedPokemonList];

    switch (property) {
      case 'number':
        sortedList.sort((a, b) => a.id - b.id);
        break;
      case 'alphabetical':
        sortedList.sort((a, b) => a.name.en.localeCompare(b.name.en));
        break;
      case 'weight':
        sortedList.sort((a, b) => a.weight - b.weight);
        break;
      case 'height':
        sortedList.sort((a, b) => a.height - b.height);
        break;
      default:
        break;
    }

    setSortedPokemonList(sortedList);
  };

  return (
    <div className="main">
      <h2>Liste des Pokémon</h2>
      <div className="sort-buttons">
        <button onClick={() => handleSort('number')}>Trier par Numéro</button>
        <button onClick={() => handleSort('alphabetical')}>Trier par Ordre Alphabétique</button>
        <button onClick={() => handleSort('weight')}>Trier par Poids</button>
        <button onClick={() => handleSort('height')}>Trier par Taille</button>
      </div>
      <ul className="pokemon-grid">
        {sortedPokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name.en} />
            <p>{`${pokemon.name.en} #${pokemon.id}`}</p>
            <p>Génération {pokemon.generation}</p>
            <div className="pokemon-types">
              {pokemon.types.map((typeId) => {
                const type = types.find((t) => t.id === typeId);
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
