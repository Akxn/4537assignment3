import React from 'react'
import './index.css';

function display({ currentPokemons, currentId }) {
    return (
        <div>
            {
                currentPokemons.map(item => {
                    if (item.id === currentId) {
                        return <>
                            <div>
                                ID: {item.id}<br/>
                                English Name: {item.name.english}<br/>
                                Type: {item.type}<br/>
                                HP: {item.base.HP}<br/>
                                Attack: {item.base.Attack}<br/>
                                Defense: {item.base.Defense}<br/>
                                Speed: {item.base.Speed}<br/>
                            </div>
                        </>
                    }
                })
            }
        </div>
    )
}

export default display