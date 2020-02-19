import React from 'react';


import PropTypes from 'prop-types';

import "../styles.scss";

export const Pokecards = props => {

    return (
            <ul>
                {props.pokeList.map(poke => (
                    <li
                        className="poke-card"
                        key={poke.name}
                        onClick={() => props.getPokeData(poke.name)}
                    >
                        <h3>{poke.name.toUpperCase()}</h3>
                    </li>
                    ))}
                    <li id="selectedCard" onClick={props.returnToMenu} />
            </ul>
    );
}

Pokecards.propTypes = {
    pokeList: PropTypes.array.isRequired,
    getPokeData: PropTypes.func.isRequired
}