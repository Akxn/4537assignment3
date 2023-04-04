import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import './index.css';

function Search({ setTypeSelectedArray }) {
  const [types, setTypes] = useState([])

  useEffect(() => {
    async function fetchTypes() {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json')
      setTypes(response.data.map(type => type.english))
    }
    fetchTypes()
  }, [])


  const clickHandle = (e) => {
    const { value, checked } = e.target

    if (checked) {
      setTypeSelectedArray(typeSelectedArray => [...typeSelectedArray, value])
    } else {
      setTypeSelectedArray(typeSelectedArray => typeSelectedArray.filter(type => type !== value))
    }
  }

  return (
    <div >
      <h3>Searching by Type...</h3>
      <div className='type'>
        {
          types.map(type => <div key={type}>
            <input
              type="checkbox"
              value={type}
              id={type}
              onChange={clickHandle}
            />
            <label htmlFor={type}>{type}</label>
          </div>)
        }
      </div>
    </div>
  )
}

export default Search