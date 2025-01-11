"use strict";
let offset = 0;
let limit = 10;
const BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
const mainPokemonContent = document.querySelector(".main_content");
const imageContainer = document.querySelector(".image_container");
const dialogBox = document.querySelector(".dialog_box");
let pokemonList = [];

async function init() {
  await pokemonData();
}

async function loadMorePokemons() {
  offset += limit;
  const updatedURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  try {
    const pokemonData = await fetchBaseUrl(updatedURL);
    pokemonData.forEach(async (pokemon) => {
      const response = await fetch(pokemon.url);
      if (response.ok) {
        const pokemonDetails = await response.json();
        pokemonDetailsData(pokemonDetails);
        pokemonSpeciesData(pokemonDetails.species.url);
      }
    });
  } catch (error) {
    console.error("Error loading", error);
  }
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

async function fetchBaseUrl(url) {
  const response = await fetch(url);
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
  const pokemonData = await fetchBaseUrl(BASE_URL);
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
  mainPokemonContent.innerHTML += writeHTML(id, name, image, abilities.join(" "));
  const pokemonObject = {
    id: dataOnDetails.id,
    name: dataOnDetails.name,
    image: image,
  };
  pokemonList.push(pokemonObject);
}

async function pokemonDialogBox(event, fromSearchBar) {
  const pokemonID = fromSearchBar || event.target.closest(".pokemon_box").id;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  const pokemonDetailsData = await response.json();
  const id = pokemonDetailsData.id;
  const name = pokemonDetailsData.name;
  const image = pokemonDetailsData.sprites.other.home.front_default;
  dialogBox.innerHTML = writeHTMLForTheBox(id, name, image);
  applyColorForTheBox(pokemonID);
  displayAttributeOverview(pokemonDetailsData);
  document.getElementById("stats").addEventListener("click", displayStatsContent.bind(null, pokemonDetailsData));
  document.getElementById("main").addEventListener("click", displayAttributeOverview.bind(null, pokemonDetailsData));
  document.getElementById("evo").addEventListener("click", displayEvolutionChain.bind(null, pokemonID));
  const nextBtn = document.querySelector(".next");
  const backBtn = document.querySelector(".back");

  nextBtn.addEventListener("click", next);
  backBtn.addEventListener("click", back);

  // next();
}

function displayAttributeOverview(data) {
  const ability = data.abilities.map((item) => item.ability.name);
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
  const pokemonNamesArr = [];
  let dialogBoxMainContent = document.querySelector(".box_content");
  const createdPokemonObj = pokemonList.find((obj) => obj.id == id);
  pokemonNamesArr.push(createdPokemonObj.evo.chain.species.name, createdPokemonObj.evo.chain.evolves_to[0].species.name);
  if (createdPokemonObj.evo.chain.evolves_to[0].evolves_to[0] !== undefined) {
    pokemonNamesArr.push(createdPokemonObj.evo.chain.evolves_to[0].evolves_to[0].species.name);
  }
  const imageUrls = pokemonNamesArr.map((name) => `https://pokeapi.co/api/v2/pokemon/${name}`);
  try {
    const response = await Promise.all(imageUrls.map((url) => fetch(url)));
    let pokemonImages = await Promise.all(response.map((respon) => respon.json()));
    dialogBoxMainContent.innerHTML = "<div class='evolution_content'></dic>";
    for (let index = 0; index < pokemonImages.length; index++) {
      document.querySelector(".evolution_content").innerHTML += HTMLEvolutionChain(pokemonImages[index].sprites.other.home.front_default);
    }
  } catch (error) {
    console.error("Error fetching data:" + error);
  }
  removeExcessArrows();
}

function applyColorForTheBox(id) {
  let color = document.getElementById(id).style.backgroundImage;
  document.querySelector(".box_image").style.backgroundImage = color;
}

function removeExcessArrows() {
  const refContent = document.querySelector(".evolution_content");
  refContent.lastChild.remove();
}

function next() {
  const counter = pokemonList.length;
  const refCurrentlyID = document.querySelector(".box_id");
  let convertToNumber = Number(refCurrentlyID.innerHTML);
  let goNext = convertToNumber + 1;
  if (counter >= goNext) {
  } else {
    goNext = 1;
  }
  pokemonDialogBox(event, goNext);
}

function back() {
  const counter = pokemonList.length;
  const refCurrentlyID = document.querySelector(".box_id");
  let convertToNumber = Number(refCurrentlyID.innerHTML);
  let goBack = convertToNumber - 1;
  console.log(goBack);
  console.log(counter);

  if (goBack == 0) {
    goBack = counter;
  }

  pokemonDialogBox(event, goBack);
}

const btn = document.querySelector(".load_button");
btn.addEventListener("click", loadMorePokemons);

// TODO make site response
