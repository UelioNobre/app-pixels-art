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

function eventsListeners() {
  const buttonRandomColor = document.getElementById('button-random-color');
  buttonRandomColor.addEventListener('click', requisito3);
  buttonRandomColor.addEventListener('click', saveColors);
}

window.onload = () => {
  requisito2();
  eventsListeners();
  getColors();
};
