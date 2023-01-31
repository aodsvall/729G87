document.addEventListener("DOMContentLoaded", init);

function init() {
  initEventlisteners();
}

function initEventlisteners() {
  document.querySelectorAll(".rectangle").forEach((element) => {
    element.addEventListener("mouseover", growRectangle);
    element.addEventListener("mouseleave", shrinkRectangle);
  });
}

function growRectangle(event) {
  const animeObject = anime({
    targets: event.target,
    height: "60vh",
    easing: "linear",
  });
}

function shrinkRectangle(event) {
  const animeObject = anime({
    targets: event.target,
    height: "5vh",
    easing: "linear",
  });
}
