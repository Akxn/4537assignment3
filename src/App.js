import React, { useState } from 'react';
import Search from "./search.js"
import FilteredPokemons from "./FilteredPokemon.js"
import { Routes ,Route } from 'react-router-dom';

function App() {
  const [typeSelectedArray, setTypeSelectedArray] = useState([]);
  return (
    <>
      <Search
        setTypeSelectedArray={setTypeSelectedArray}
        typeSelectedArray={typeSelectedArray}
      />
      <FilteredPokemons
        typeSelectedArray={typeSelectedArray}
      />

    </>
  );
}

export default App;
