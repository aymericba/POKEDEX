// Popup.js

import React, { useState } from 'react';

const Popup = ({ pokemon, onClose }) => {
  const [isShiny, setIsShiny] = useState(false);

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
        {/* Ajoutez d'autres caractéristiques selon vos besoins */}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Popup;