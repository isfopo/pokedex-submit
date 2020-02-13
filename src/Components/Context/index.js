import React, { Component } from 'react';

const PokedexContext = new React.createContext();

export class Provider extends Component {

    state = {
        pokeList: [],
        limit: 12,
        offset: 0,
        searchString: ""
    };
    
    handleIncreaseOffset = () => {
      this.setState({ offset: this.state.offset + this.state.limit });
    };
  
    handleDecreaseOffset = () => {
      this.setState({ offset: this.state.offset - this.state.limit });
    };
  
    renderPokemon = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.setState({ pokeList: response.results });
        })
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
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
          return response.json();
        })
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

  render() {
      return (
        <PokedexContext.Provider value={{
          pokeList: this.state.pokeList,
          limit: this.state.limit,
          offset: this.state.offset,
          searchString: this.state.searchString,
          actions:{
            handleIncreaseOffset: this.handleIncreaseOffset,
            handleDecreaseOffset: this.handleDecreaseOffset,
            renderPokemon: this.renderPokemon,
            getPokeData: this.getPokeData,
            returnToMenu: this.returnToMenu,
            handleSearchChange: this.handleSearchChange,
            handleSearchSubmit: this.handleSearchSubmit     
          }
        }}>
        { this.props.children }
        </PokedexContext.Provider>
    )
  } 
}

export const Consumer = PokedexContext.Consumer;
