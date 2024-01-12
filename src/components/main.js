import React, { useState } from 'react';
import { usePokemonContext } from '../PokemonContext';
import SearchBar from './searchbar';

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
  const { pokemonList, types, searchTerm } = usePokemonContext();
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterGeneration, setFilterGeneration] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const sortPokemonList = () => {
    return [...pokemonList]
      .filter((pokemon) => (filterGeneration === 'all' || pokemon.generation === parseInt(filterGeneration, 10)))
      .filter((pokemon) => (filterType === 'all' || pokemon.types.includes(parseInt(filterType, 10))))
      .filter((pokemon) => pokemon.name.en.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const compareValue = (field) => {
          if (field === 'name') {
            return a.name.en.localeCompare(b.name.en);
          } else {
            return a[field] - b[field];
          }
        };

        const result = compareValue(sortField);

        return sortOrder === 'asc' ? result : -result;
      });
  };

  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleGenerationChange = (event) => {
    setFilterGeneration(event.target.value);
  };

  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <div className="main">
      <h2>Liste des Pokémon</h2>
      <SearchBar />
      <div>
        <label htmlFor="sortField">Trier par : </label>
        <select id="sortField" onChange={handleSortFieldChange} value={sortField}>
          <option value="id">Numéro</option>
          <option value="name">Ordre alphabétique</option>
          <option value="height">Taille</option>
          <option value="weight">Poids</option>
        </select>
        <label htmlFor="sortOrder">Ordre : </label>
        <select id="sortOrder" onChange={handleSortOrderChange} value={sortOrder}>
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>
      <div>
        <label htmlFor="generation">Filtrer par génération : </label>
        <select id="generation" onChange={handleGenerationChange} value={filterGeneration}>
          <option value="all">Toutes les générations</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((generation) => (
            <option key={generation} value={generation}>
              Génération {generation}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="type">Filtrer par type : </label>
        <select id="type" onChange={handleTypeChange} value={filterType}>
          <option value="all">Tous les types</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name.en}
            </option>
          ))}
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
