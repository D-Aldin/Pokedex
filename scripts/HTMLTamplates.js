function writeHTML(id, name, img, abilities) {
  return `  
            <div onclick="pokemonDialogBox(event)"> 
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
              <img src="${img}" alt="">
            </div>
            <div class="box_menu">
              <button id="main" onclick="">main</button>
              <button id="stats">stats</button>
              <button id="evo">evo chain</button>
            </div>  
            <div class="box_content"></div>
            `;
}

function HTMLMenuContent(height, wight, experience, ability) {
  return `
          <table>
            <tr>
              <td>Height:</td>
              <td>${height}</td>
            </tr>
            <tr>
              <td>Wight:</td>
              <td>${wight}</td>
            </tr>
            <tr>
              <td>Base experience:</td>
              <td>${experience}</td>
            </tr>
            <tr>
              <td>Abilities:</td>
              <td>${ability}</td>
           </tr>
          </table>`;
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
