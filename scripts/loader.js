const refButton = document.querySelector(".load_button");
const refImage = document.querySelector("#rotateImage");

refButton.addEventListener("click", () => {
  document.querySelector(".loader_overlay").style.display = "flex";
  document.querySelector(".loader").style.display = "flex";
  refImage.classList.toggle("rotate");
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".loader_overlay").style.display = "none";
    refImage.classList.toggle("rotate");
  }, 1000);
});
