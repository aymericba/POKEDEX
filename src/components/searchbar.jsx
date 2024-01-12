import React, { useState, useEffect } from 'react';
import { usePokemonContext } from '../PokemonContext';

const SearchBar = () => {
  const { setSearchTerm } = usePokemonContext();
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  useEffect(() => {
    // Mettre à jour le terme de recherche dans le contexte lorsque localSearchTerm change
    setSearchTerm(localSearchTerm);
  }, [localSearchTerm, setSearchTerm]);

  const handleSearchChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Rechercher : </label>
      <input
        type="text"
        id="search"
        value={localSearchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;