const refDataList = document.querySelector("#browsers");
const input = document.getElementById("search");

function search() {
  let duplicateList = [];
  input.addEventListener("input", () => {
    let searchForPokemon = input.value;
    for (const name of pokemonList) {
      const pokemonName = name.name;
      let firstLetters = pokemonName.slice(0, 3);
      if (firstLetters === searchForPokemon) {
        const newValue = document.createElement("option");
        newValue.value = pokemonName;
        checkListForDuplicate(duplicateList, newValue);
      }
    }
    handleErrors();
  });
}

function checkListForDuplicate(arr, value, name) {
  let checkForDuplicates = arr.includes(value);
  if (checkForDuplicates === false) {
    refDataList.appendChild(value);
    arr.push(name);
  }
}

function handleErrors() {
  try {
    const refPokemonID = Number(document.getElementById(input.value).parentElement?.parentElement?.parentElement.id);
    pokemonDialogBox(event, refPokemonID);
    overlayOn();
  } catch {}
}

function showMagnifier() {
  const refHeaderClass = document.querySelector("header");
  const refPokemonLogo = document.querySelector(".pokemon_logo");
  const refFormTag = document.querySelector("#form");
  const refSearchBar = document.querySelector("#search");
  refPokemonLogo.classList.toggle("display_none");
  refFormTag.classList.toggle("form_class");
  if (refPokemonLogo.classList.contains("display_none")) {
    refSearchBar.style.display = "flex";
    refHeaderClass.style.justifyContent = "end";
  } else {
    refSearchBar.style.display = "none";
    refHeaderClass.style.justifyContent = "space-between";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  search();
});
document.querySelector(".magnifier").addEventListener("click", showMagnifier);
