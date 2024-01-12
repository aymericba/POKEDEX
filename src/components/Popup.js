// Popup.js

import React from 'react';

const Popup = ({ pokemon, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
      <img src={pokemon.image} alt={pokemon.name.en} />
        <p>{`${pokemon.name.en} #${pokemon.id}`}</p>
        <p>Génération: {pokemon.generation}</p>
        {/* Ajoutez d'autres caractéristiques selon vos besoins */}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Popup;