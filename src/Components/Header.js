import React from 'react';
import TitleBar from './TitleBar';
import Searchbar from './Searchbar';

import "../styles.scss";

export const Header = () => {
    return (
        <div className="header">

            <TitleBar />
            <Searchbar />

        </div>
    )
}
