import React from 'react';

function PokemonModal({ showModal, setShowModal, pokemon }) {
  if (!showModal) {
    return null;
  }

  const imageUrl = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${('00' + pokemon.id).slice(-3)}.png`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={() => setShowModal(false)}>
          Close
        </button>
        <h2>#{pokemon.id} {pokemon.name.english}</h2>
        <img className="pokemon-image" src={imageUrl} alt={pokemon.name.english} />
        <div className="pokemon-type">
          {pokemon.type.join(' ')}
        </div>
        <table>
          <tbody>
            {Object.entries(pokemon.base).map(([stat, value]) => (
              <tr key={stat}>
                <td className="stat">{stat}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PokemonModal;