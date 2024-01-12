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
  const [sortOption, setSortOption] = useState({
    field: 'id',
    order: 'asc',
  });
  const [filterGeneration, setFilterGeneration] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const sortPokemonList = () => {
    return [...pokemonList]
      .filter((pokemon) => (filterGeneration === 'all' || pokemon.generation === parseInt(filterGeneration, 10)))
      .filter((pokemon) => (filterType === 'all' || pokemon.types.includes(parseInt(filterType, 10))))
       .filter((pokemon) =>
       pokemon.name.en.toLowerCase().includes(searchTerm.toLowerCase())
    )
      .sort((a, b) => {
        const compareValue = (field) => {
          if (field === 'name') {
            return a.name.en.localeCompare(b.name.en);
          } else {
            return a[field] - b[field];
          }
        };

        const result = compareValue(sortOption.field);

        return sortOption.order === 'asc' ? result : -result;
      });
  };

  const handleSortChange = (event) => {
    const field = event.target.value;
    setSortOption((prevSortOption) => ({
      field,
      order: prevSortOption.field === field && prevSortOption.order === 'asc' ? 'desc' : 'asc',
    }));
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
      <div>
        <label htmlFor="sort">Trier par : </label>
        <select id="sort" onChange={handleSortChange} value={sortOption.field}>
          <option value="id">Numéro (Croissant)</option>
          <option value="id-desc">Numéro (Décroissant)</option>
          <option value="name">Ordre alphabétique (Croissant)</option>
          <option value="name-desc">Ordre alphabétique (Décroissant)</option>
          <option value="height">Taille (Croissant)</option>
          <option value="height-desc">Taille (Décroissant)</option>
          <option value="weight">Poids (Croissant)</option>
          <option value="weight-desc">Poids (Décroissant)</option>
        </select>
      </div>
      <div>
        <label htmlFor="generation">Filtrer par génération : </label>
        <select id="generation" onChange={handleGenerationChange} value={filterGeneration}>
          <option value="all">Toutes les générations</option>
          <option value="1">Génération 1</option>
          <option value="2">Génération 2</option>
          <option value="3">Génération 3</option>
          <option value="4">Génération 4</option>
          <option value="3">Génération 5</option>
          <option value="4">Génération 6</option>
          <option value="3">Génération 7</option>
          <option value="4">Génération 8</option>
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
