"use strict";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";
const mainPokemonContent = document.querySelector(".main_content");
const imageContainer = document.querySelector(".image_container");
const dialogBox = document.querySelector(".dialog_box");
let pokemonImage = [];

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
  document.getElementById(species.id).style.backgroundImage = generateRandomGradient(species.color.name);
}

async function pokemonDetailsData(dataOnDetails) {
  const id = dataOnDetails.id;
  const name = dataOnDetails.name;
  const image = dataOnDetails.sprites.other.home.front_default;
  const abilities = dataOnDetails.types.map((element) => element.type.name);
  mainPokemonContent.innerHTML += writeHTML(id, name, image, abilities.join(" "));
  pokemonImage.push(image);
}

async function pokemonDialogBox(event) {
  const pokemonID = event.target.closest(".pokemon_box").id;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  const pokemonDetailsData = await response.json();
  const id = pokemonDetailsData.id;
  const name = pokemonDetailsData.name;
  const image = pokemonDetailsData.sprites.other.home.front_default;
  dialogBox.innerHTML = writeHTMLForTheBox(id, name, image);
  colorForTheBox(pokemonID);
  displayMainContent(pokemonDetailsData);
  document.getElementById("stats").addEventListener("click", StatsContent.bind(null, pokemonDetailsData));
  document.getElementById("main").addEventListener("click", displayMainContent.bind(null, pokemonDetailsData));
  document.getElementById("evo").addEventListener("click", evoChain.bind(null, pokemonID));
}

function displayMainContent(data) {
  const ability = data.abilities.map((item) => item.ability.name);
  const dialogBoxMainContent = document.querySelector(".box_content");
  dialogBoxMainContent.innerHTML = HTMLMenuContent(data.height, data.weight, data.base_experience, ability);
}

function StatsContent(data) {
  const stats = data.stats.map((item) => item.stat.name);
  const dialogBoxMainContent = document.querySelector(".box_content");
  dialogBoxMainContent.innerHTML = HTMLStatsContent(stats[0], stats[1], stats[2], stats[3], stats[4], stats[5]);
  const nodeList = document.querySelectorAll("progress");
  for (let index = 0; index < nodeList.length; index++) {
    nodeList[index].value = data.stats[index].base_stat;
  }
}

async function evoChain(id) {
  const fetchSpeciesData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const species = await fetchSpeciesData.json();

  const fetchEvoChainData = await fetch(species.evolution_chain.url);
  const evoChain = await fetchEvoChainData.json();

  console.log(evoChain.chain.evolves_to[0].species);
  const dani = evoChain.chain.evolves_to[0].species.url;

  const pokemonToEvolves = await fetch(dani);
  const ajla = await pokemonToEvolves.json();
  // console.log(dani);
  // console.log(ajla);
  console.log(pokemonImage);
}

function colorForTheBox(id) {
  let color = document.getElementById(id).style.backgroundImage;
  document.querySelector(".box_image").style.backgroundImage = color;
}
