function generateRandomNumbers() {
  return parseInt(Math.random() * 255);
}

function createRandomColor() {
  return `rgb(${generateRandomNumbers()}, ${generateRandomNumbers()}, ${generateRandomNumbers()})`;
}

function addColorToDom() {
  const domColors = document.querySelectorAll('.color');
  for (let index = 1; index < domColors.length; index+= 1) {
    domColors[index].style.backgroundColor = `${createRandomColor()}`;
  }
}

console.log(addColorToDom());