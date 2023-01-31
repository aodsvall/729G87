document.addEventListener("DOMContentLoaded", (event) => {
  // show initial widget values
  updateWidgetDisplay();

  // listen for input events that bubble up
  document.querySelector("#buttons").addEventListener("input", (event) => {
    updateWidgetDisplay();
  });
});

function updateWidgetDisplay() {
  let toggleValues = [];
  document.querySelectorAll("toggle-button").forEach((widget) => {
    toggleValues.push(widget.value);
  });
  document.querySelector("#button-values").innerHTML = toggleValues.join(", ");
}
