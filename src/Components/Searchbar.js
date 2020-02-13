import React from 'react';

import { Consumer } from './Context';

import "../styles.scss";

function Searchbar() {

    const input = React.createRef();

    return (
        <Consumer>
            { context => {
                const handleSearchSubmit = e => {
                    e.preventDefault();
                    context.actions.getPokeData(context.searchString.toLocaleLowerCase());
                    e.currentTarget.reset();
                };

                const handleSearchChange = e => {
                    context.searchString = e.target.value;
                };

                return (
                    <div id="searchbar">
                        <form onSubmit={handleSearchSubmit}>
                            <label>
                                <input
                                    type="text"
                                    value={context.searchString}
                                    ref={input}
                                    onChange={handleSearchChange}
                                    placeholder="Search Pokemon"
                                />
                            </label>
                        </form>
                    </div>
                )
            }}
        </Consumer>
    )
}

export default Searchbar;