const imgList = [
  "./img/eye-1485299_1920.jpg",
  "./img/facade-1453303_1920.jpg",
  "./img/graffiti-207627_1920.jpg",
  "./img/graffiti-569265_1920.jpg",
  "./img/lost-places-3095466_1920.jpg",
  "./img/mouth-2122687_1920.jpg",
  "./img/public-2606715_1920.jpg",
  "./img/street-2556529_1920.jpg",
  "./img/street-art-2692868_1920.jpg",
  "./img/street-art-8257490_1920.jpg",
  "./img/tunnel-2588054_1920.jpg",
  "./img/urban-art-2143185_1920.jpg",
  "./img/wall-art-2852231_1920.jpg",
  "./img/zabou-2290189_1920.jpg",
  "./img/pexels-mali-63sss238.jpg",
];

let counter = 0;

function render() {
  for (let index = 0; index < imgList.length; index++) {
    const element = imgList[index];
    document.getElementById("content").innerHTML += writeHtml(element, index);
  }

  document.getElementById("box").innerHTML = writeHtmlForTheBox();
}

function writeHtml(e, i) {
  return `<div>
            <img id=${i} onclick="overlayOn(); boxImage(${i})" src="${e}" alt="Street Art">
          </div>`;
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

function writeHtmlForTheBox() {
  return `
      <div class="box-title">
        <span id=title></span>
        <button onclick="closeBox()" class="close-box glow-on-hover">X</button>
      </div>
      <div class="box-image">
        <img id="boxImage" src="" alt="Street Art">
      </div>
      <div class="box-buttons">
        <button onclick="back()" class="prev glow-on-hover"> Previous </button>
        <span id="ImageCount" class="image-counter"></span>
        <button onclick="next()" id=next class="next glow-on-hover"> Next </button>
      </div>`;
}

function boxImage(index) {
  const getImage = document.getElementById(index);
  document.querySelector("#boxImage").src = getImage.src;
  counter = index;
  setCounter(counter)

  displayName(getImage.src)


}

function updateBox(imageList) {
  let getBoxContent = document.querySelector("#boxImage");
  let boxImage = imageList[counter];
  getBoxContent.src = boxImage;
  setCounter(counter)

  displayName(boxImage);
  
}

function next() {
  counter++;
  if (counter >= imgList.length) {
    counter = 0;
  }
  updateBox(imgList);
}

function back() {
  counter--;
  if (counter < 0) {
    counter = imgList.length - 1;
  }
  updateBox(imgList);
}

function count(params) {
  document.getElementById;
}

function closeBox() {
  overlayOff();
}


function setCounter(num) {
  document.querySelector("#ImageCount").innerHTML = `${num + 1}/${imgList.length}`
}

function displayName(name) {

  document.querySelector("#title").innerHTML = name.split("/img/")[1];

}






