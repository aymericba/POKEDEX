import React, { useState } from 'react';
import { usePokemonContext } from '../PokemonContext';
import SearchBar from './searchbar';
import Popup from './Popup';

// Composant représentant un élément Pokémon dans la liste
const PokemonItem = ({ pokemon, types, onSelect }) => (
  <li key={pokemon.id} onClick={() => onSelect && onSelect(pokemon)}>
    <img src={pokemon.image} alt={pokemon.name.en} />
    <p>{`${pokemon.name.en} #${pokemon.id}`}</p>
    <p>Génération {pokemon.generation}</p>
    <div className="pokemon-types">
      {/* Affichage des types du Pokémon */}
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

// Composant principal représentant la liste des Pokémon avec des options de tri et de filtre
const Main = () => {
  // Utilisation du contexte Pokémon pour obtenir la liste des Pokémon, les types, et le terme de recherche
  const { pokemonList, types, searchTerm } = usePokemonContext();

  // États locaux pour gérer les options de tri, filtres par génération et type
  const [sortField, setSortField] = useState('id'); // Champ de tri par défaut
  const [sortOrder, setSortOrder] = useState('asc'); // Ordre de tri par défaut
  const [filterGeneration, setFilterGeneration] = useState('all'); // Filtre par génération
  const [filterType, setFilterType] = useState('all');
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Filtre par type

  // Fonction pour trier la liste des Pokémon en fonction des options actuelles
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

  // Gestionnaire de changement pour le champ de tri
  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  // Gestionnaire de changement pour l'ordre de tri
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Gestionnaire de changement pour le filtre par génération
  const handleGenerationChange = (event) => {
    setFilterGeneration(event.target.value);
  };

  // Gestionnaire de changement pour le filtre par type
  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  // Rendu du composant
  return (
    <div className="main">
      <h2>Liste des Pokémon</h2>
      {/* Barre de recherche */}
      <SearchBar />
      {/* Sélection des options de tri et filtres */}
      <div>
        <label htmlFor="sortField">Trier par : </label>
        {/* Menu déroulant pour le champ de tri */}
        <select id="sortField" onChange={handleSortFieldChange} value={sortField}>
          <option value="id">Numéro</option>
          <option value="name">Ordre alphabétique</option>
          <option value="height">Taille</option>
          <option value="weight">Poids</option>
        </select>
        <label htmlFor="sortOrder">Ordre : </label>
        {/* Menu déroulant pour l'ordre de tri */}
        <select id="sortOrder" onChange={handleSortOrderChange} value={sortOrder}>
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>
      <div>
        <label htmlFor="generation">Filtrer par génération : </label>
        {/* Menu déroulant pour le filtre par génération */}
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
        {/* Menu déroulant pour le filtre par type */}
        <select id="type" onChange={handleTypeChange} value={filterType}>
          <option value="all">Tous les types</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name.en}
            </option>
          ))}
        </select>
      </div>
      {/* Liste des Pokémon rendue en fonction des options de tri et de filtre */}
      <ul className="pokemon-grid">
        {sortPokemonList().map((pokemon) => (
          <PokemonItem key={pokemon.id} 
          pokemon={pokemon} 
          types={types} 
          onSelect={(selectedPokemon) => setSelectedPokemon(selectedPokemon)} />
        ))}
      </ul>
      {selectedPokemon && (
        <Popup pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} types={types}/>
      )}
    </div>
  );
};

export default Main;
