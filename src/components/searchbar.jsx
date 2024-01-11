
import React, { useEffect, useState } from 'react';
import { usePokemonContext } from '../PokemonContext';

const SearchBar = () => {
  const { pokemonList } = usePokemonContext();

  useEffect(() => {
    // Utilisez la liste des Pokémon selon vos besoins
    console.log('Pokemon List:', pokemonList);

    // Ajoutez le reste de votre logique ici

  }, [pokemonList]); // Assurez-vous d'inclure toutes les dépendances nécessaires dans le tableau de dépendances
    const [filterData,setfilterData] = useState([])
  const handleFilter = (event) => {

    }
  return (
    <div className='search-top'>
      <div className='search'>
        <input type='text' placeholder='search here' onChange={handleFilter}/>
      </div>
      <div className='search-result'>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
      </div>
    </div>
  );
};

export default SearchBar