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

window.onload = () => {
  addColorToDom();

  const btnGenerateRandomColors = document.getElementById('button-random-color');
  btnGenerateRandomColors.addEventListener('click', createNewPalette);
};
