import React from 'react'
import "./style.css"

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
                                Janpanese Name: {item.name.japanese}<br/>
                                Chinese Name: {item.name.chinese}<br/>
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