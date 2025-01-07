"use strict";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";
const mainPokemonContent = document.querySelector(".main_content");
const imageContainer = document.querySelector(".image_container");
const dialogBox = document.querySelector(".dialog_box");
let pokemonList = [];

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

async function fetchBaseUrl() {
  const response = await fetch(BASE_URL);
  try {
    if (!response.ok) {
      throw new console.error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return null;
  }
}

async function pokemonData() {
  const pokemonData = await fetchBaseUrl();
  for (let index = 0; index < pokemonData.length; index++) {
    const pokemon = pokemonData[index];
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new console.error(`Error! Status: ${response.status}`);
      }
      const pokemonDetails = await response.json();
      pokemonDetailsData(pokemonDetails);
      pokemonSpeciesData(pokemonDetails.species.url);
    } catch (error) {
      console.error(`Error fetching details for ${pokemon}:`, error);
    }
  }
}

async function pokemonSpeciesData(url) {
  const speciesResponse = await fetch(url);
  const species = await speciesResponse.json();
  document.getElementById(species.id).style.backgroundImage = generateRandomGradient(species.color.name);
  const evolutionResponse = await fetch(species.evolution_chain.url);
  const evoData = await evolutionResponse.json();
  const evoDataContent = pokemonList.find((obj) => obj.id === species.id);
  evoDataContent.evo = evoData;
}

async function pokemonDetailsData(dataOnDetails) {
  const id = dataOnDetails.id;
  const name = dataOnDetails.name;
  const image = dataOnDetails.sprites.other.home.front_default;
  const abilities = dataOnDetails.types.map((element) => element.type.name);
  console.log(abilities);

  mainPokemonContent.innerHTML += writeHTML(id, name, image, abilities.join(" "));
  const pokemonObject = {
    id: dataOnDetails.id,
    name: dataOnDetails.name,
    image: image,
  };
  pokemonList.push(pokemonObject);
}

async function pokemonDialogBox(event) {
  const pokemonID = event.target.closest(".pokemon_box").id;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  const pokemonDetailsData = await response.json();
  const id = pokemonDetailsData.id;
  const name = pokemonDetailsData.name;
  const image = pokemonDetailsData.sprites.other.home.front_default;
  dialogBox.innerHTML = writeHTMLForTheBox(id, name, image);
  applyForTheBox(pokemonID);
  displayAttributeOverview(pokemonDetailsData);
  document.getElementById("stats").addEventListener("click", displayStatsContent.bind(null, pokemonDetailsData));
  document.getElementById("main").addEventListener("click", displayAttributeOverview.bind(null, pokemonDetailsData));
  document.getElementById("evo").addEventListener("click", displayEvolutionChain.bind(null, pokemonID));
}

function displayAttributeOverview(data) {
  const ability = data.abilities.map((item) => item.ability.name);
  console.log(data);

  const dialogBoxMainContent = document.querySelector(".box_content");
  dialogBoxMainContent.innerHTML = attributeOverviewHTML(data.height, data.weight, data.base_experience, ability);
}

function displayStatsContent(data) {
  const stats = data.stats.map((item) => item.stat.name);
  const dialogBoxMainContent = document.querySelector(".box_content");
  dialogBoxMainContent.innerHTML = HTMLStatsContent(stats[0], stats[1], stats[2], stats[3], stats[4], stats[5]);
  const nodeList = document.querySelectorAll("progress");
  for (let index = 0; index < nodeList.length; index++) {
    nodeList[index].value = data.stats[index].base_stat;
  }
}

async function displayEvolutionChain(id) {
  const result = pokemonList.find((obj) => obj.id == id);
  const first = result.evo.chain.species.name;
  const secound = result.evo.chain.evolves_to[0].species.name;
  const third = result.evo.chain.evolves_to[0].evolves_to[0].species.name;
  const imageUrls = [`https://pokeapi.co/api/v2/pokemon/${first}`, `https://pokeapi.co/api/v2/pokemon/${secound}`, `https://pokeapi.co/api/v2/pokemon/${third}`];
  try {
    const response = await Promise.all(imageUrls.map((url) => fetch(url)));
    const pokemonImages = await Promise.all(response.map((respon) => respon.json()));
    const dialogBoxMainContent = document.querySelector(".box_content");
    dialogBoxMainContent.innerHTML = HTMLEvoChain(pokemonImages[0].sprites.other.home.front_default, pokemonImages[1].sprites.other.home.front_default, pokemonImages[2].sprites.other.home.front_default);
  } catch (error) {
    console.error("Error fetching data:" + error);
  }
}

function applyForTheBox(id) {
  let color = document.getElementById(id).style.backgroundImage;
  document.querySelector(".box_image").style.backgroundImage = color;
}
