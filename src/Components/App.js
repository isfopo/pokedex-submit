import React from "react";
import { Header } from './Header';


import "../styles.scss";
import { PikaPic } from "./PikaPic";


export const App = () => {

  return (
    <div className="App">

      <Header />

    {/*<div id="main-content">
      <ul>
        {this.state.pokeList.map(poke => (
          <li
            className="poke-card"
            key={poke.name}
            onClick={() => this.getPokeData(poke.name)}
          >
            <h3>{poke.name.toUpperCase()}</h3>
          </li>
        ))}
        <li id="selectedCard" onClick={this.returnToMenu} />
      </ul>

      <button
        id="previous"
        className="btn poke-card"
        onClick={this.handleDecreaseOffset}
      >
        Previous
      </button>
      <button
        id="next"
        className="btn poke-card"
        onClick={this.handleIncreaseOffset}
      >
        Next
      </button>
    </div>*/}

      <PikaPic></PikaPic>
    </div>
  );
}

//export default App;
