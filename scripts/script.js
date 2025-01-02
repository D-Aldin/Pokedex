"use strict";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";
const mainPokemonContent = document.querySelector(".main_content");
const imageContainer = document.querySelector(".image_container");
let pokemonArray = [];

function init() {
  pokemonData();
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
            <div id="${id}" class="pokemon_box" onclick="overlayOn()">
                <article class="content_arrangement">
                    <div class="pokemon_title">
                        <div class="pokemon_id">#${id}</div>
                        <div class="pokemon_name">${name}</div>
                    </div>
                    <div class="image_container">
                      <img src="${img}" alt="" />
                    </div>
                    <div class="abilities_arangement">  
                      <div class="pokemon_abilities">${abilities}</div>
                    </div>  
                </article>
            </div>`;
}

function writeHTMLForTheBox() {
  return `
          <div class="title_arangement">
            <div class="box_id">iddsadasd</div>
            <div class="box_name">name</div>
          </div>
          <div>
            <span>imgage</span>
          </div>
          <div>menu</div>
          <div>content</div>
          </div>`;
}

async function getPokemnonAPI() {
  const response = await fetch(BASE_URL);
  try {
    if (!response.ok) {
      throw new console.error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

async function pokemonData() {
  const pokemonData = await getPokemnonAPI();
  for (let index = 0; index < pokemonData.length; index++) {
    const pokemon = pokemonData[index];
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new console.error(`HTTP error! Status: ${response.status}`);
      }
      const pokemonDetails = await response.json();
      pokemonDetailsData(pokemonDetails);
      pokemonSpeciesData(pokemonDetails.species.url);
    } catch (error) {
      console.error(`Error fetching details for ${pokemon}:`, error);
    }
  }
}

async function pokemonSpeciesData(response) {
  const fetchSpeciesData = await fetch(response);
  const species = await fetchSpeciesData.json();
  console.log(species);
  let color = (document.getElementById(species.id).style.backgroundColor = species.color.name);
}

async function pokemonDetailsData(dataOnDetails) {
  const id = dataOnDetails.id;
  const name = dataOnDetails.name;
  const image = dataOnDetails.sprites.other.home.front_default;
  const abilities = dataOnDetails.types.map((element) => element.type.name);
  mainPokemonContent.innerHTML += writeHTML(id, name, image, abilities.join(" "));
}
