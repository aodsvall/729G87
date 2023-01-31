document.addEventListener("DOMContentLoaded", init);

function init() {
  initEventListeners();
}

function initEventListeners() {
  document.getElementById("input").addEventListener("keyup", inputText);
  document
    .querySelector(".style-changer")
    .addEventListener("click", changeText);
    document.querySelector('.new-paragraph').addEventListener('click', newP);
}
function inputText() {
  let timeout = null;
  let output = document.querySelector(".text");
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    output.textContent = input.value;
  }, 1000);
}

function newP() {
  let handler = document.querySelector('#output');
  
}

function changeText() {
  let output = document.querySelector(".text");
  var value = document.querySelector("#styler").value;
  console.log(value);
  if (value == 1) {
    output.style.fontStyle = "italic";
  } else if (value == 2) {
    output.style.color = "red";
  } else if (value == 3) {
    output.style.fontWeight = 800;
    console.log("YES");
  }
}
