function requisito2() {
  const cores = ['black', 'red', 'green', 'blue'];
  const divColors = document.querySelectorAll('.color');
  for (let index = 0; index < divColors.length; index += 1) {
    divColors[index].style.backgroundColor = cores[index];
  }
}

// function requisito3() {}

window.onload = () => {
  requisito2();
  // requisito3();
};
