import React from 'react';

import "../styles.scss";

function TitleBar() {
    return (
        <div>
            <img
            className="header-logo"
            src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pokedex.png"
            alt="pokedex logo"
            />
            <h1>Pok&eacute;dex</h1>
            <br />
        </div>
    )
}

export default TitleBar;