import React from "react";
import { useState, useEffect } from "react";

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

    useEffect( () => {
        // immediately invoked anonymous async arrow function
        ( async () => {
            try{
                /* get first 151  OG pokemon by creating a list
                of promises and then calling promise.all to resolve
                all of the promises */
                let urls = []
                for(let i = 1; i < 152; i++){
                   urls.push((await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)).json() )
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
            {
                !pokemon ? 'no pokemon found' :
                pokemon.map( monster => 
                    <img key={monster.id + 'img'}
                    src={monster.sprites.front_default} />
                )
            }
        </div>
    );
}