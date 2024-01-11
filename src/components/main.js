import React, { useState } from 'react';
import { usePokemonContext } from '../PokemonContext';

const PokemonItem = ({ pokemon, types }) => (
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
);

const Main = () => {
  const { pokemonList, types } = usePokemonContext();
  const [sortOption, setSortOption] = useState('id'); // Par défaut, trier par numéro

  const sortPokemonList = () => {
    return [...pokemonList].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.en.localeCompare(b.name.en);
      } else if (sortOption === 'weight') {
        return a.weight - b.weight;
      } else if (sortOption === 'height') {
        return a.height - b.height;
      } else {
        return a.id - b.id; // Par défaut, trier par numéro
      }
    });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="main">
      <h2>Liste des Pokémon</h2>
      <div>
        <label htmlFor="sort">Trier par : </label>
        <select id="sort" onChange={handleSortChange} value={sortOption}>
          <option value="id">Numéro</option>
          <option value="name">Ordre alphabétique</option>
          <option value="weight">Poids</option>
          <option value="height">Taille</option>
        </select>
      </div>
      <ul className="pokemon-grid">
        {sortPokemonList().map((pokemon) => (
          <PokemonItem key={pokemon.id} pokemon={pokemon} types={types} />
        ))}
      </ul>
    </div>
  );
};

export default Main;
