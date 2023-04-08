import React from 'react'
import Search from './search'
import Pagination from './Pagination'
import FilteredPokemons from './FilteredPokemon'
import Logout from './Logout'
import { useState } from 'react'

function SearchPage({user, setUser, accessToken, refreshToken, setAccessToken, setRefreshToken}) {
    const [typeSelectedArray, setTypeSelectedArray] = useState([]);
    const [searchQuery, setSearchQuery] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [pageNumber, setPageNumber] = useState(1);
    const [count, setCount] = useState(0);

  return (
    <div>
          <h3 className='title-h3'>Welcome, {user.username}</h3>
          <Search
              setTypeSelectedArray={setTypeSelectedArray}
              typeSelectedArray={typeSelectedArray}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
          />
          <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              count={count} />
          <FilteredPokemons
              accessToken={accessToken}
              refreshToken={refreshToken}
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}
              searchQuery={searchQuery}
              typeSelectedArray={typeSelectedArray}
              pokemons={pokemons}
              setPokemons={setPokemons}
              filteredPokemons={filteredPokemons}
              setFilteredPokemons={setFilteredPokemons}
              setCount={setCount}
              pageNumber={pageNumber} />
    </div>
  )
}

export default SearchPage;