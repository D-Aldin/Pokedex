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
        let checkForDuplicates = duplicateList.includes(newValue.value);
        if (checkForDuplicates === false) {
          refDataList.appendChild(newValue);
          duplicateList.push(pokemonName);
        }
      }
    }
    try {
      const refPokemonID = Number(document.getElementById(input.value).parentElement?.parentElement?.parentElement.id);
      pokemonDialogBox(event, refPokemonID);
      overlayOn();
    } catch {}
  });
}

document.addEventListener("DOMContentLoaded", () => {
  search();
});
