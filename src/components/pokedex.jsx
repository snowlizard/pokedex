import React from "react";
import { useState, useEffect } from "react";
import pokeball from '../assets/pokeball.png';

// pokemon object
/*  
    id,
    name,
    height,
    weight,
    sprites.front_default for image
    types: types[0].type.name

    types is an array of each object type 
*/

export const Pokedex = () => {
    const [pokemon, setpokemon] = useState([]);
    const [currentPokemon, setCurrent] = useState({});

    // when user clicks div with pokemon name
    // set that as the current pokemon
    const handleClick = (monster) => {
        setCurrent(monster);
    }

    useEffect( () => {
        // immediately invoked anonymous async arrow function
        ( async () => {
            try{
                /* get first 151  OG pokemon by creating a list
                of promises and then calling promise.all to resolve
                all of the promises */
                let urls = []
                for(let i = 1; i < 152; i++){
                   urls.push(
                       (await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)).json() )
                }
                Promise.all(urls)
                .then( response => setpokemon(response) )

            }catch(e){
                console.log(`ERROR: ${e}`)
            }
        })()
    }, []);
    /* ---- UseEffect end here ------ */

    return (
        <div className="main-view">
            <div className="banner-main">
                <span>
                    Kanto Pokédex
                </span>
            </div>
            <div className="main-bottom">
                <div className="pokemon-info">
                    <div className="pokemon-name-banner">
                        {
                            currentPokemon ? currentPokemon.name
                            : ''
                        }
                    </div>
                    {
                        !Object.hasOwn(currentPokemon, "name") ? ''
                        : 
                        <div>
                            {
                                <img src={currentPokemon.sprites.front_default}
                                id="pokemon-image"/>
                            }
                            <div className="pokemon-info">
                                <span>{currentPokemon.height}</span>
                                <span>{currentPokemon.weight}</span>
                            </div>
                        </div> 
                    }
                </div>

                <div className="pokemon-list">
                    <div className="pokemon-list-border"></div>
                    {
                        pokemon.map( monster => 
                            <div key={`${monster.id}/pokemon`}
                            className='pokemon-list-item'
                            onClick={ () => handleClick(monster)}>

                                <img src={pokeball} 
                                className="list-item-pokeball"/>
                                <span>
                                    {
                                        monster.id < 10 ?
                                        `00${monster.id}` :
                                        monster.id < 100  ?
                                        `0${monster.id}`  :
                                        monster.id
                                    }
                                </span>
                                <span className="pokemon-name">
                                    {monster.name}
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}