import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => {
        const requests = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
        Promise.all(requests)
          .then(pokemons => {
            const pokemonData = pokemons.map(pokemon => ({
              id: pokemon.id,
              name: pokemon.name,
              imageUrl: pokemon.sprites.front_default
            }));
            setPokemonList(pokemonData);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = id => {
    const updatedList = pokemonList.filter(pokemon => pokemon.id !== id);
    setPokemonList(updatedList);
  };

  return (
    <div className="container">
      <h1>Lista de pokémones</h1>
      <div className="card-container">
        {pokemonList.map(pokemon => (
          <div key={pokemon.id} className="card">
            <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemon-image" />
            <div className="pokemon-name">{pokemon.name}</div>
            <button onClick={() => handleDelete(pokemon.id)} className="delete-button">Borrar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;