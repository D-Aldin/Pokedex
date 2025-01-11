const refDataList = document.querySelector("#browsers");
const input = document.getElementById("search");

function search() {
  let duplicateList = [];
  input.addEventListener("input", () => {
    let searchForPokemon = input.value;
    document.getElementsByClassName("pokemon_name").innerHTML;
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
    // console.log(input.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  search();
});
