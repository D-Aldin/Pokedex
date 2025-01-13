function generateRandomGradient(baseColor = "green") {
  function generateColorInShade(baseColor) {
    const shades = {
      red: [200, 255, 50, 150, 50, 150],
      green: [50, 150, 200, 255, 50, 150],
      blue: [50, 150, 50, 150, 200, 255],
      yellow: [200, 255, 200, 255, 50, 150],
    };
    const range = shades[baseColor.toLowerCase()] || [50, 255, 50, 255, 50, 255];
    const [rMin, rMax, gMin, gMax, bMin, bMax] = range;
    const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const r = randomInRange(rMin, rMax);
    const g = randomInRange(gMin, gMax);
    const b = randomInRange(bMin, bMax);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const angle = Math.floor(Math.random() * 360);
  const color1 = generateColorInShade(baseColor);
  const color2 = generateColorInShade(baseColor);
  const color3 = generateColorInShade(baseColor);

  return `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
}
