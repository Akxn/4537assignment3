import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'

function Search({ setTypeSelectedArray, typeSelectedArray }) {
  const [types, setTypes] = useState([])

  useEffect(() => {
    async function fetchTypes() {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json')
      setTypes(response.data.map(type => type.english))
    }
    fetchTypes()
  }, [])

  const handleClick = (event) => {
    const { value, checked } = event.target

    if (checked) {
      setTypeSelectedArray([...typeSelectedArray, value])
    } else {
      setTypeSelectedArray(typeSelectedArray.filter(type => type !== value))
    }
  }

  return (
    <div className="type-checkboxes">
      {types.map((type) => (
        <div key={type}>
          <input
            type="checkbox"
            id={type}
            value={type}
            onChange={handleClick}
            checked={typeSelectedArray.includes(type)}
          />
          <label htmlFor={type}>{type}</label>
        </div>
      ))}
    </div>
  )
}

export default Search
