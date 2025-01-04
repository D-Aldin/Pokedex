function generateRandomGradient(baseColor) {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const angle = Math.floor(Math.random() * 360);
  const color1 = baseColor || getRandomColor();
  const color2 = getRandomColor();
  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  return gradient;
}
