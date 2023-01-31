document.addEventListener('DOMContentLoaded', init);

function init() {
  initEventListeners();
}

function initEventListeners() {
  document.querySelector('.square').addEventListener('mouseover', hideSquare);
}

function hideSquare(event) {
  event.target.classList.add('active');
}
