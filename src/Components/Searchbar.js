import React from 'react';

import PropTypes from 'prop-types';

import "../styles.scss";

const Searchbar = props => {

    const input = React.createRef();

    return (
        <div id="searchbar">
            <form onSubmit={props.handleSearchSubmit}>
                <label>
                    <input
                        type="text"
                        value={props.searchString}
                        ref={input}
                        onChange={props.handleSearchChange}
                        placeholder="Search Pokemon"
                    />
                </label>
            </form>
        </div>
    )
}

Searchbar.propTypes = {
    searchString: PropTypes.string.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    handleSearchSubmit: PropTypes.func.isRequired
}

export default Searchbar;