import React, { useState, useEffect } from "react";

import TitleBar from './TitleBar';
import Searchbar from './Searchbar';
import Pokecards from './Pokecards';
import NavButtons from './NavButtons';
import PikaPic from "./PikaPic";


import "../styles.scss";

export const App = () => {

  const [pokeList, setPokeList] = useState([]);
  const [limit] = useState(12);
  const [offset, setOffset] = useState(0);
  const [searchString, setSearchString] = useState("");

  const renderPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        setPokeList(response.results);
      })
  };

  const getPokeData = name => {
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

  const returnToMenu = () => {
    [...document.getElementsByClassName("poke-card")].forEach(
      card => (card.style.display = "inline-block")
    );

    [...document.getElementsByClassName("header")].forEach(
      card => (card.style.display = "block")
    );

    document.getElementById("selectedCard").style.display = "none";

    renderPokemon();
  };

  const handleIncreaseOffset = () => {
    setOffset( offset + limit );
  };

  const handleDecreaseOffset = () => {
    setOffset( offset - limit );
  };

  const handleSearchChange = e => {
    setSearchString( e.target.value );
  };

  const handleSearchSubmit = e => {
    getPokeData(searchString.toLocaleLowerCase());
    e.preventDefault();
  };

  useEffect(() => {
    renderPokemon()
    // eslint-disable-next-line
  }, [offset] )

  return (
    <div className="App">

      <div className="header">
        <TitleBar />
        <Searchbar 
            searchString={searchString}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
        />
      </div>

      <div id="main-content">
        <Pokecards 
          pokeList={pokeList}
          getPokeData={getPokeData}
          returnToMenu={returnToMenu}
        />

        <NavButtons 
          handleDecreaseOffset={handleDecreaseOffset}
          handleIncreaseOffset={handleIncreaseOffset}
        />
      </div>

      <PikaPic />
    </div>
  );
}
