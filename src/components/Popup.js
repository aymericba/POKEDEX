// Popup.js

import React from 'react';

const Popup = ({ pokemon }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <img src={pokemon.image} alt={pokemon.name.en} />
        <h3>{pokemon.name.en}</h3>
        {/* Ajoutez ici les caractéristiques du Pokémon */}
        {/* Par exemple : */}
        <p>Numéro: #{pokemon.id}</p>
        <p>Génération: {pokemon.generation}</p>
        {/* Ajoutez d'autres caractéristiques selon vos besoins */}
        <button onClick={/* Ajoutez la fonction de fermeture du popup */}>Fermer</button>
      </div>
    </div>
  );
};

export default Popup;