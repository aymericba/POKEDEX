// Popup.js
import React, { useState } from 'react';
import { usePokemonContext } from '../PokemonContext';

const Popup = ({ pokemon, onClose }) => {
    const [isShiny, setIsShiny] = useState(false);
    const { types } = usePokemonContext(); // Assurez-vous d'importer usePokemonContext depuis votre contexte
  
    const toggleShiny = () => {
      setIsShiny((prevIsShiny) => !prevIsShiny);
    };
  
    return (
      <div className="popup">
        <div className="popup-content">
          <header>
            <button onClick={toggleShiny}>Shiny</button>
          </header>
          <img src={isShiny ? pokemon.image_shiny : pokemon.image} alt={pokemon.name.en} />
          <p>{`${pokemon.name.en} #${pokemon.id}`}</p>
          <p>Génération: {pokemon.generation}</p>
          <p>Taille: {pokemon.height} m</p>
          <p>Poids: {pokemon.weight} kg</p>
          <p>Types: {pokemon.types.map((typeId) => types.find((t) => t.id === typeId).name.en).join(', ')}</p>
          {/* Ajoutez d'autres caractéristiques selon vos besoins */}
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    );
  };
  
  export default Popup;