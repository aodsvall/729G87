document.addEventListener("DOMContentLoaded", init);

function init() {
  initEventListeners();
}

function initEventListeners() {
  document.querySelectorAll(".circle").forEach((circle) => {
    circle.addEventListener("click", greenCircle);
  });
  document.querySelectorAll(".square").forEach((square) => {
    square.addEventListener("click", resizeSquare);
  });
  document.querySelectorAll(".rectangle").forEach((rectangle) => {
    rectangle.addEventListener("click", moveRectangle);
  });
}

function greenCircle(event) {
    event.target.classList.toggle('green');
}

function resizeSquare(event) {
    squStyle = window.getComputedStyle(event.target, null);
    changeArea = squStyle.getPropertyValue('height');
    changeArea = (parseFloat(changeArea) / 2) + "px";
    event.target.style.height = changeArea;
    event.target.style.width = changeArea;
}

function moveRectangle(event) {
    recStyle = window.getComputedStyle(event.target, null);
    changeMargin = recStyle.getPropertyValue('top');
    changeMargin = (parseFloat(changeMargin) + 10) + "px";
    event.target.style.top = changeMargin;
}
