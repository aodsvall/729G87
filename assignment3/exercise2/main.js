let boxesOnScreen = 1;



document.addEventListener("DOMContentLoaded", init);

function init() {
  initEventListeners();
}

function initEventListeners() {
  document.querySelector("#boxes").addEventListener("change", updateBoxes);
}

function updateBoxes(event) {
  clearBoxes();
  boxesOnScreen = event.target.value;
  addBoxes();
}

function addBoxes() {
  for (var i = 0; i < boxesOnScreen; i++) {
    const boxWrapper = document.getElementById("box-wrapper");
    const square = document.createElement("div");
    square.classList.add("square");
    boxWrapper.append(square);
  }
}

function clearBoxes() {
  while (document.getElementsByClassName("square")[0]) {
    document.getElementsByClassName("square")[0].remove();
  }
}