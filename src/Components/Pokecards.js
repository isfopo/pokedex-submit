import React from 'react';

import "../styles.scss";

import { Consumer } from './Context'

export const Pokecards = () => {
    return (
        <Consumer>
            { context => {
                return (
                    <>
                        <ul>
                            {context.pokeList.map(poke => (
                                <li
                                    className="poke-card"
                                    key={poke.name}
                                    onClick={() => this.getPokeData(poke.name)}
                                >
                                    <h3>{poke.name.toUpperCase()}</h3>
                                </li>
                                ))}
                                <li id="selectedCard" onClick={context.actions.returnToMenu} />
                        </ul>
                    </>
                )
            }}
        </Consumer>
    );
}