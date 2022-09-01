let cores = ['black', 'red', 'green', 'blue'];
const pixels = document.querySelectorAll('.pixel');
const colorPalette = document.querySelectorAll('.color');

// Requisito 5
function saveColors() {
  localStorage.setItem('colorPalette', JSON.stringify(cores));
}

function getColors() {
  if (!localStorage.getItem('colorPalette')) {
    saveColors();
  }

  cores = JSON.parse(localStorage.getItem('colorPalette'));
  return cores;
}

// Adiciona cores à paleta
function requisito2() {
  const colors = getColors();
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].style.backgroundColor = colors[index];
  }
}

// Gera cores aleatorias
function requisito3() {
  for (let index = 1; index < cores.length; index += 1) {
    const corAleatoria = `#${Math.random().toString(16).substring(2, 8)}`;
    cores[index] = corAleatoria;
  }
  saveColors();
  requisito2();
}

// ouvite botao gera cor aleatoria
function eventListenerButtonRandomColor() {
  const buttonRandomColor = document.getElementById('button-random-color');
  buttonRandomColor.addEventListener('click', requisito3);
  buttonRandomColor.addEventListener('click', saveColors);
}

// Seleciona uma cor
function paletteSelectColor(e) {
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].classList.remove('selected');
    if (colorPalette[index] === e.target) {
      colorPalette[index].classList.add('selected');
    }
  }
}

// ouvite que seleciona as cores
function eventListenerSelectColor() {
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].addEventListener('click', paletteSelectColor);
  }
}

// Obtenho o desenho do usuario
function getPixelsState() {
  if (!localStorage.getItem('pixelBoard')) return;

  const pixelsState = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].setAttribute('style', `background-color: ${pixelsState[index]}`);
  }
}

// Salva o desenho do usuário
function savePixelsState() {
  const pixelsState = [];

  for (let index = 0; index < pixels.length; index += 1) {
    pixelsState[index] = pixels[index].style.backgroundColor;
  }

  localStorage.setItem('pixelBoard', JSON.stringify(pixelsState));
}

// pintando os pixels
function paintPixel(e) {
  const currentColor = document.querySelector('.selected').style.backgroundColor;
  e.target.style.backgroundColor = currentColor;

  savePixelsState();
}

// ouvinte dos pixels
function eventListenerPixelBoard() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', paintPixel);
  }
}

// limpa o quadro
function clearBoard() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].removeAttribute('style');
  }
}

// ouvinte limpa os pixels
function eventListenerclearBoard() {
  document.querySelector('#clear-board').addEventListener('click', clearBoard);
}

window.onload = () => {
  requisito2();
  getColors();
  getPixelsState();
  eventListenerButtonRandomColor();
  eventListenerSelectColor();
  eventListenerPixelBoard();
  eventListenerclearBoard();
};
