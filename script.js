function createRandomColor() {
  return `#${Math.random().toString(16).substring(2, 8)}`;
}

function addColorToDom() {
  const domColors = document.querySelectorAll('.color');
  domColors[0].style.backgroundColor = 'black';
  for (let index = 1; index < domColors.length; index+= 1) {
    domColors[index].style.backgroundColor = `${createRandomColor()}`;
  }
}

window.onload = function () {
  addColorToDom();
}
