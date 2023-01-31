document.addEventListener("DOMContentLoaded", init);

function init() {
  initEventListeners();
}

function initEventListeners() {
  document.querySelectorAll(".btn").forEach((buttons) => {
    buttons.addEventListener("click", toggleClasses);
    document.querySelector(".slider").addEventListener("change", setOpacity);
  });
}

function toggleClasses(event) {
  const buttons = document.querySelectorAll(".btn");
  for (let btn of buttons) {
    btn.classList.remove("on");
    btn.classList.add("off");
    document.getElementById("square" + btn.value).classList.add("not-active");
    document.getElementById("square" + btn.value).classList.remove("active");
  }
  event.target.classList.add("on");
  event.target.classList.remove("off");
  const square = document.getElementById("square" + event.target.value);
  square.classList.add("active");
  square.classList.remove("not-active");
  const getOpacity = window.getComputedStyle(square, null);
  document.querySelector(".slider").value =
    getOpacity.getPropertyValue("opacity");
  animationFunction();
}

function setOpacity(event) {
  const animateOpacity = anime({
    targets: ".active",
    opacity: event.target.value,
    easing: "linear",
  }, anime.remove('.active'));
}

function animationFunction() {
  const animateOn = anime({
    targets: ".on",
    border: "5px solid blue",
  }, anime.remove('.on'));
  const animateOff = anime({
    targets: ".off",
    border: "1px solid gray",
  }, anime.remove('.off'));

  const animateBigSquare = anime({
    targets: ".active",
    scale: 2,
    easing: "linear",
  }, anime.remove('.active'));
  const animeLittleSquare = anime({
    targets: ".not-active",
    scale: 1,
    easing: "linear",
  }, anime.remove('.no-active'));
  
}
