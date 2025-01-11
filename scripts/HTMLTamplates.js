function writeHTML(id, name, img, abilities) {
  return `  
            <div onclick="pokemonDialogBox(event)"> 
              <div id="${id}" class="pokemon_box" onclick="overlayOn()">
                  <article class="content_arrangement">
                      <div class="pokemon_title">
                          <div class="pokemon_id">#${id}</div>
                          <div id=${name} class="pokemon_name">${name}</div>
                      </div>
                      <div class="image_container">
                        <img src="${img}" alt="" />
                      </div>
                      <div class="abilities_arangement">  
                        <div class="pokemon_abilities">${abilities}</div>
                      </div>  
                  </article>
              </div>
            </div>  `;
}

function writeHTMLForTheBox(id, name, img) {
  return `
            <div class="title_arangement">
              <div class="box_id">${id}</div>
              <div class="box_name">${name}</div>
            </div>
            <div class="box_image">
              <h2>${name}</h2>
              <img src="${img}" alt="">
            </div>
            <div class="box_content"></div>
            <div class="box_menu">
              <button class="btn" id="main" onclick="">main</button>
              <button class="btn" id="stats">stats</button>
              <button class="btn" id="evo">evo chain</button>
            </div>
            <div>
              <div>
                <img class="back" id="backBtn" src="./assets/icons/back.png" alt="next" />
              </div>
              <div>
                <img class="next" id="nextBtn" src="./assets/icons/next.png" alt="back" />
              </div>
            </div>
            `;
}

function attributeOverviewHTML(height, wight, experience, ability) {
  return `
          <table>  
            <tr>
              <th>Height:</th>
              <td>${height}</td>
            </tr>
            <tr>
              <th>Wight:</th>
              <td>${wight}</td>
            </tr>
            <tr>
              <th>Base experience:</th>
              <td>${experience}</td>
            </tr>
            <tr>
              <th>Abilities:</th>
              <td>${ability}</td>
           </tr>
          </table>
          `;
}

function HTMLStatsContent(hp, attack, defense, specialAttack, specialDefense, speed) {
  return `
    <div class="progress_content">
      <div id="hp">
        <span>${hp}</span>
        <progress value="10" max="100"></progress>
      </div>
      <div id="attack">
        <span>${attack}</span>
        <progress id="p5" value="100" max="100"></progress>
      </div>
      <div id="defense">
        <span>${defense}</span>
        <progress id="p5" value="100" max="100"></progress>
      </div>
      <div id="specialAttack">
        <span>${specialAttack}</span>
        <progress id="p5" value="100" max="100"></progress>
      </div>
      <div id="specialDefense">
        <span>${specialDefense}</span>
        <progress id="p5" value="100" max="100"></progress>
      </div>
      <div id="speed">
        <span>${speed}</span>
        <progress id="p5" value="100" max="100"></progress>
      </div>
    </div>
  `;
}

function HTMLEvoChain() {
  return `
        <div class="evolution_content">
          <img class="evolution_image" src="" alt="" />
          <img class="arrow" src="./assets/icons/fast-forward.png" alt="" />
          <img class="evolution_image" src="" alt="" />
          <img class="arrow" src="./assets/icons/fast-forward.png" alt="" />
          <img class="evolution_image" src="" alt="" />
        </div>`;
}

function HTMLEvolutionChain(img) {
  return `
        <img class="evolution_image" src="${img}" alt="" />
        <img class="arrow" src="./assets/icons/fast-forward.png" alt="" />`;
}
