import React, { useState } from 'react'
import Pokemon from './Pokemon'
import "./style.css"

function page({ currentPokemons, setCurrentId, currentId }) {

  const showInfo = (item) => {
    setCurrentId(item.id)
  }

  return (
    <div>
      <div className="pokemon-list">
        {
          currentPokemons.map(item => {
            return <>
              <div className='imgBorder' id={(currentId === item.id) ? 'active' : ''} onClick={() => showInfo(item)}>
                <Pokemon pokemon={item} />
                <h4>{item.name.english}</h4>
                <br/>
              </div>
            </>
          })
        }
      </div>
    </div>
  )
}

export default page