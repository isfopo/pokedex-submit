import React, { PureComponent } from "react";

import "./styles.scss";

const Pokedex = require("pokeapi-js-wrapper");

const PokeClient = new Pokedex.Pokedex({
  protocol: "https",
  cache: true,
  timeout: 5000
});

// a small change

class App extends PureComponent {
  state = {
    pokeList: [],
    offset: 0,
    searchString: ""
  };

  handleIncreaseOffset = () => {
    this.setState({ offset: this.state.offset + 12 });
  };

  handleDecreaseOffset = () => {
    this.setState({ offset: this.state.offset - 12 });
  };

  renderPokemon = () => {
    PokeClient.getPokemonsList({ limit: 12, offset: this.state.offset })
      .then(response => {
        this.setState({ pokeList: response.results });
      })
      .catch();
  };

  getPokeData = name => {
    const selectedCard = document.getElementById("selectedCard");

    selectedCard.innerHTML = ``;

    [...document.getElementsByClassName("poke-card")].forEach(
      card => (card.style.display = "none")
    );
    [...document.getElementsByClassName("header")].forEach(
      card => (card.style.display = "none")
    );

    selectedCard.style.display = "block";

    PokeClient.getPokemonByName(name)
      .then(function(response) {
        console.log(response);

        let htmlResponse = ``;

        const name = response.name.toUpperCase().replace("-", " ");
        const number = response.id;
        const typesArray = [...response.types];
        const sprite = response.sprites.front_default;
        const statsArray = [...response.stats].reverse();
        const weight = response.weight * 0.220462;
        const height = response.height * 0.328084;
        const ablilitiesArray = [...response.abilities];

        // Name
        htmlResponse += `<h2>${name}</h2>`;

        // Sprites
        htmlResponse += '<div id="info-card">';
        htmlResponse += `<img src=${sprite} alt=${name} height=500 width=500 id="poke-img">`;

        // Number
        htmlResponse += '<div id="poke-info">';
        htmlResponse += `<p style="font-weight:bold;">No. ${number}</p>`;

        // Type
        htmlResponse += `<h3 class="info-catagory">Type:</h3>`;
        typesArray.forEach(type => {
          htmlResponse += `<p class="info-result">${type.type.name.toUpperCase()}</p>`;
        });

        // Ablilities
        htmlResponse += `<h3 class="info-catagory">ABLILITIES:</h3>`;
        ablilitiesArray.forEach(ability => {
          htmlResponse += `<p class="info-result">${ability.ability.name
            .replace("-", " ")
            .toUpperCase()}</p>`;
        });

        // Stats
        htmlResponse += `<h3 class="info-catagory">STATS:</h3>`;
        statsArray.forEach(stat => {
          htmlResponse += `<p class="info-catagory">- ${stat.stat.name
            .replace("-", " ")
            .toUpperCase()}: </p>
          <p class="info-result">${stat.base_stat}</p>`;
        });

        htmlResponse += `<p class="info-catagory">- WEIGHT: </p>
                        <p class="info-result">${weight.toFixed(2)} lbs</p>`;
        htmlResponse += `<p class="info-catagory">- HEIGHT: </p>
                        <p class="info-result">${height.toFixed(2)} ft</p>`;

        htmlResponse += `</div></div>`;

        selectedCard.innerHTML = htmlResponse;
      })
      .catch(() => {
        selectedCard.innerHTML = `<h2>${name} is not found!</h2>`;
      });
  };

  returnToMenu = () => {
    [...document.getElementsByClassName("poke-card")].forEach(
      card => (card.style.display = "inline-block")
    );

    [...document.getElementsByClassName("header")].forEach(
      card => (card.style.display = "block")
    );

    document.getElementById("selectedCard").style.display = "none";

    this.renderPokemon();
  };

  // Serach methods

  handleSearchChange = e => {
    this.setState({ searchString: e.target.value });
  };

  handleSearchSubmit = e => {
    this.getPokeData(this.state.searchString.toLocaleLowerCase());
    e.preventDefault();
  };

  // lifycycle methods

  componentDidMount() {
    this.renderPokemon();
  }

  componentDidUpdate() {
    this.renderPokemon();
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <img
            className="header-logo"
            src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pokedex.png"
            alt="pokedex logo"
          />
          <h1>Pok&eacute;dex</h1>
          <br />
          <div id="searchbar">
            <form onSubmit={this.handleSearchSubmit}>
              <label>
                <input
                  type="text"
                  value={this.state.searchString}
                  onChange={this.handleSearchChange}
                  placeholder="Search Pokemon"
                />
              </label>
            </form>
          </div>
        </div>

        <div id="main-content">
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
        </div>

        <img
          id="pikachu"
          className="hvr-hang"
          src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pikachu.png"
          alt="Pikachu"
        />
      </div>
    );
  }
}

export default App;
