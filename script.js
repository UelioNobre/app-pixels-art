let cores = ['black', 'red', 'green', 'blue'];

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
  const divColors = document.querySelectorAll('.color');
  const colors = getColors();
  for (let index = 0; index < divColors.length; index += 1) {
    divColors[index].style.backgroundColor = colors[index];
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
  const colorPalette = document.querySelectorAll('.color');
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].classList.remove('selected');
    if (colorPalette[index] === e.target) {
      colorPalette[index].classList.add('selected');
    }
  }
}

// ouvite que seleciona as cores
function eventListenerSelectColor() {
  const colorPalette = document.querySelectorAll('.color');
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].addEventListener('click', paletteSelectColor);
  }
}

window.onload = () => {
  requisito2();
  getColors();
  eventListenerButtonRandomColor();
  eventListenerSelectColor();
};
