import React, { useState } from 'react';
import { usePokemonContext } from '../PokemonContext';

const Popup = ({ pokemon, onClose }) => {
  const [isShiny, setIsShiny] = useState(false);
  const { types } = usePokemonContext();

  const toggleShiny = () => {
    setIsShiny((prevIsShiny) => !prevIsShiny);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div>
        <header>
          <button onClick={toggleShiny}>Shiny</button>
        </header>
        <img src={isShiny ? pokemon.image_shiny : pokemon.image} alt={pokemon.name.en} />
        <p>{`${pokemon.name.en} #${pokemon.id}`}</p>
        <p>Génération: {pokemon.generation}</p>
        <p>Taille: {pokemon.height} m</p>
        <p>Poids: {pokemon.weight} kg</p>
        <p>Types: {pokemon.types.map((typeId) => types.find((t) => t.id === typeId).name.en).join(', ')}</p>
        </div>
        <div>
        {/* Vérifiez si les statistiques existent avant de les afficher */}
        {pokemon.stats && (
          <div>
            <p>Statistiques:</p>
            <ul>
              <li>HP: {pokemon.stats.hp}</li>
              <li>Attaque: {pokemon.stats.atk}</li>
              <li>Défense: {pokemon.stats.def}</li>
              <li>Vitesse: {pokemon.stats.vit}</li>
              <li>Attaque spéciale: {pokemon.stats.spe_atk}</li>
              <li>Défense spéciale: {pokemon.stats.spe_def}</li>
            </ul>
          </div>
        )}

        <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;