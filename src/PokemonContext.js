import React, { createContext, useContext, useState, useEffect } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Appelle l'API pour récupérer la liste des Pokémon
    fetch('https://pokedex-api.3rgo.tech/api/pokemon')
      .then(response => response.json())
      .then(data => setPokemonList(data.data))
      .catch(error => console.error('Error fetching Pokémon data:', error));

    // Appelle l'API pour récupérer la liste des types de Pokémon
    fetch('https://pokedex-api.3rgo.tech/api/types')
      .then(response => response.json())
      .then(data => setTypes(data.data))
      .catch(error => console.error('Error fetching types data:', error));
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemonList, types }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
