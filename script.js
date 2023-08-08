let cores = ['black', 'red', 'green', 'blue'];
let pixels = document.querySelectorAll('.pixel');
const pixelBoard = document.querySelector('#pixel-board');
const colorPalette = document.querySelectorAll('.color');
const buttonRandomColor = document.getElementById('button-random-color');

// salva no localStorage
function saveLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Salva as cores em localStorage
function saveColors() {
  saveLocalStorage('colorPalette', cores);
}

// Obtem as cores do localStorage
function getColorsOfLocalStorage() {
  if (!localStorage.getItem('colorPalette')) saveColors();
  cores = JSON.parse(localStorage.getItem('colorPalette'));
  return cores;
}

// Adiciona cores à paleta
function addColorToPalette() {
  const colors = getColorsOfLocalStorage();
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].style.backgroundColor = colors[index];
  }
}

// Gera cores aleatorias
function requisito3() {
  for (let index = 1; index < cores.length; index += 1) {
    const color = Math.random().toString(16).substring(2, 8);
    const corAleatoria = `#${color}`;
    cores[index] = corAleatoria;
  }
  saveColors();
  addColorToPalette();
}

// Seleciona uma cor
function paletteSelectColor(e) {
  const palletLength = colorPalette.length;
  for (let index = 0; index < palletLength; index += 1) {
    colorPalette[index].classList.remove('selected');
    if (colorPalette[index] === e.target) colorPalette[index].classList.add('selected');
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

// limpa o quadro
function clearBoard() {
  localStorage.removeItem('pixelBoard');
  const pixelsLength = pixels.length;
  for (let index = 0; index < pixelsLength; index += 1) {
    pixels[index].removeAttribute('style');
  }
}

// Set listeners
function setListeners() {
  buttonRandomColor.addEventListener('click', requisito3);
  buttonRandomColor.addEventListener('click', saveColors);
  document.querySelector('#clear-board').addEventListener('click', clearBoard);

  const palletLength = colorPalette.length;
  const pixelsLength = pixels.length;

  for (let index = 0; index < palletLength; index += 1) {
    colorPalette[index].addEventListener('click', paletteSelectColor);
  }

  for (let index = 0; index < pixelsLength; index += 1) {
    pixels[index].addEventListener('click', paintPixel);
  }
}

// adicionar o tamanho de size aqui
function generatePixels(size) {
  pixelBoard.innerHTML = null;

  for (let row = 0; row < size; row += 1) {
    const divRow = document.createElement('div');
    for (let col = 0; col < size; col += 1) {
      const divPixel = document.createElement('div');
      divPixel.className = 'pixel';
      divRow.appendChild(divPixel);
    }
    pixelBoard.append(divRow);
  }

  // update pixel
  pixels = document.querySelectorAll('.pixel');
}

// Obtem tamanho do board para cria-lo
function getBoardLocalStorage() {
  if (!localStorage.getItem('boardSize')) localStorage.setItem('boardSize', 5);
  const size = Math.round(localStorage.getItem('boardSize'));
  generatePixels(size);
}

// Gera o board de acordo com o tamanho
function generateBoard() {
  const inputBoard = document.querySelector('#board-size');
  let inputBoardSize = parseInt(inputBoard.value, 10);
  if (Number.isNaN(inputBoardSize) === true || inputBoardSize < 1) {
    alert('Board inválido!');
    return;
  }

  if (inputBoardSize < 5) inputBoardSize = 5;
  if (inputBoardSize > 50) inputBoardSize = 50;

  inputBoard.value = inputBoardSize;

  saveLocalStorage('boardSize', inputBoardSize);
  generatePixels(inputBoardSize);
  setListeners();
  clearBoard();
}

// ouvinte generate board
function eventListenerGenerateBoard() {
  document.querySelector('#generate-board').addEventListener('click', generateBoard);
}

window.onload = () => {
  getBoardLocalStorage();
  getColorsOfLocalStorage();
  getPixelsState();
  addColorToPalette();
  setListeners();
  eventListenerGenerateBoard();
};
