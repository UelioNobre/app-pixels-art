function createPalette() {
  const colors = [];
  const size = document.querySelectorAll('.color').length;

  for (let index = 0; index < size - 1; index += 1) {
    const color = `#${Math.random().toString(16).substring(2, 8)}`;
    colors.push(color);
  }

  localStorage.setItem('colorPalette', JSON.stringify(colors));
}

function addColorToDom() {
  const domColors = document.querySelectorAll('.color');
  domColors[0].style.backgroundColor = 'black';
  domColors[0].classList.add('selected');

  if (!localStorage.getItem('colorPalette')) {
    createPalette();
  }

  const colors = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < domColors.length - 1; index += 1) {
    domColors[index + 1].style.backgroundColor = colors[index];
  }
}

function createNewPalette() {
  localStorage.removeItem('colorPalette');
  addColorToDom();
}

function selectColor(e) {
  // rermove todas as cores
  console.log(e.target);

  const palettes = document.querySelectorAll('.color');
  for (let index = 0; index < palettes.length; index += 1) {
    if (e.target === palettes[index]) {
      palettes[index].classList.add('selected');
      localStorage.setItem('currentColor', JSON.stringify(palettes[index].style.backgroundColor));
    } else {
      palettes[index].classList.remove('selected');
    }
  }
}

function paintPixel(e) {
  const color = JSON.parse(localStorage.getItem('currentColor'));
  e.target.style.backgroundColor = color;
}

window.onload = () => {
  addColorToDom();

  const btnGenerateRandomColors = document.getElementById('button-random-color');
  btnGenerateRandomColors.addEventListener('click', createNewPalette);

  const palettes = document.querySelectorAll('.color');
  for (let index = 0; index < palettes.length; index += 1) {
    palettes[index].addEventListener('click', selectColor);
    palettes[index].classList.remove('selected');
  }

  // Clique no pixel
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', paintPixel);
  }
};
