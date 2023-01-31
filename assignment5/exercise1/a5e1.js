document.addEventListener("DOMContentLoaded", (event) => {
  // show initial widget values
  updateWidgetDisplay();

  // listen for input events that bubble up
  document.querySelectorAll("radio-groups").forEach((group) => {
    group.addEventListener("input", (event) => {
      updateWidgetDisplay();
    });
  });
});

function updateWidgetDisplay() {
  let toggleValues = [];
  document.querySelectorAll("radio-button").forEach((widget) => {
    toggleValues.push(widget.value);
  });
  document.querySelector("#radio-values").innerHTML = toggleValues.join(", ");
}
