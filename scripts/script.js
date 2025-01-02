"use strict";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";
let mainPokemonContent = document.querySelector(".main_content");
let pokedex = [];

function init() {
  getDetails();
}

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

function stopEventBubbel(event) {
  event.stopPropagation();
}

function writeHTML(id, name, img, abilities) {
  return `   
            <div class="pokemon_box" onclick="overlayOn()">
                <article class="content_arrangement">
                    <div class="pokemon_title">
                        <div class="pokemon_id">#${id}</div>
                        <div class="pokemon_name">${name}</div>
                    </div>
                    <div>
                      <img src="${img}" alt="" />
                    </div>  
                    <div class="pokemon_abilities">${abilities}</div>
                </article>
            </div>`;
}

async function getPokemnonAPI() {
  const response = await fetch(BASE_URL);
  try {
    if (!response.ok) {
      throw new console.error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

async function getDetails() {
  const pokemonData = await getPokemnonAPI();
  for (let index = 0; index < pokemonData.length; index++) {
    const pokemon = pokemonData[index];
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new console.error(`HTTP error! Status: ${response.status}`);
      }
      const pokemonDetails = await response.json();
      const id = pokemonDetails.id;
      const name = pokemonDetails.name;
      const image = pokemonDetails.sprites.other.home.front_default;
      const abilities = pokemonDetails.types.map((element) => element.type.name);
      const color = await fetch(pokemonDetails.species.url);
      console.log(await color.json());

      mainPokemonContent.innerHTML += writeHTML(id, name, image, abilities.join(" "));
    } catch (error) {
      console.error(`Error fetching details for ${pokemon}:`, error);
    }
  }
}
