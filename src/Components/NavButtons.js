import React from 'react';

import "../styles.scss";

export const NavButtons = props => {
    return (
        <>
            <button
                id="previous"
                className="btn poke-card"
                onClick={props.handleDecreaseOffset}
            >
                Previous
            </button>

            <button
                id="next"
                className="btn poke-card"
                onClick={props.handleIncreaseOffset}
            >
                Next
            </button>
        </>
    )
}

export default NavButtons;