import React, { useState } from 'react';
import { usePokemonContext } from '../PokemonContext';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const Popup = ({ pokemon, onClose }) => {
  const [isShiny, setIsShiny] = useState(false);
  const { types, pokemonList } = usePokemonContext(); // Ajoutez pokemonList ici

  const toggleShiny = () => {
    setIsShiny((prevIsShiny) => !prevIsShiny);
  };

  const getEvolutionImage = (id) => {
    const evolvedPokemon = pokemonList.find((p) => p.id === id); // Utilisez pokemonList ici
    return isShiny ? evolvedPokemon.image_shiny : evolvedPokemon.image;
  };
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const search = t('src');
  const filter = t('filter');
  let pokename;
  if (currentLang === "fr"){
    pokename = pokemon.name.fr;
  }
  else if(currentLang === "en"){
    pokename = pokemon.name.en;
  }
  else{
    pokename = pokemon.name;
  }
  return (
    <div className="popup">
      <div className="popup-content">
        <div>
          <header>
            <button onClick={toggleShiny}>Shiny</button>
          </header>
          <img src={isShiny ? pokemon.image_shiny : pokemon.image} alt={pokename} />
          <p>{`${pokename} #${pokemon.id}`}</p>
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

          {pokemon.evolvedFrom && Object.keys(pokemon.evolvedFrom).length > 0 && (
            <div>
              <p>Évolué à partir de :</p>
              <ul>
                {Object.entries(pokemon.evolvedFrom).map(([id, condition]) => (
                  <li key={id}>
                    <img src={getEvolutionImage(parseInt(id))} alt={`Evolved from #${id}`} />
                    {`#${id}: ${condition}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pokemon.evolvesTo && Object.keys(pokemon.evolvesTo).length > 0 && (
            <div>
              <p>Évolue vers :</p>
              <ul>
                {Object.entries(pokemon.evolvesTo).map(([id, condition]) => (
                  <li key={id}>
                    <img src={getEvolutionImage(parseInt(id))} alt={`Evolves to #${id}`} />
                    {`#${id}: ${condition}`}
                  </li>
                ))}
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
