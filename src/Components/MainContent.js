import React from 'react';

import "../styles.scss";

import { Pokecards } from './Pokecards';
import { NavButtons } from './NavButtons';

const MainContent = () => {
    return (
        <div id="main-content">
            <Pokecards />

            <NavButtons />
        </div>
    );
}

export default MainContent;