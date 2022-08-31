const cores = ['black', 'red', 'green', 'blue'];
function requisito2() {
  const divColors = document.querySelectorAll('.color');
  for (let index = 0; index < divColors.length; index += 1) {
    divColors[index].style.backgroundColor = cores[index];
  }
}

// Gera cores aleatorias
function requisito3() {
  for (let index = 1; index < cores.length; index += 1) {
    const corAleatoria = `#${Math.random().toString(16).substring(2, 8)}`;
    cores[index] = corAleatoria;
  }
  requisito2();
}

function eventsListeners() {
  const buttonRandomColor = document.getElementById('button-random-color');
  buttonRandomColor.addEventListener('click', requisito3);
}

window.onload = () => {
  requisito2();
  eventsListeners();
};
