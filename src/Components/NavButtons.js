import React from 'react';

import "../styles.scss";

import { Consumer } from './Context'

export const NavButtons = () => {
    return (
        <Consumer>
            { context => {
                return (
                    <>
                        <button
                            id="previous"
                            className="btn poke-card"
                            onClick={context.actions.handleDecreaseOffset}
                        >
                            Previous
                        </button>
                        <button
                            id="next"
                            className="btn poke-card"
                            onClick={context.actions.handleIncreaseOffset}
                        >
                            Next
                        </button>
                    </>
                )
            }}
        </Consumer>
    )
}