const template_rb = document.createElement("template");
template_rb.innerHTML = `
<style>
.wrapper {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.label {
    font-family: Arial, Helvetica, sans-serif;

}


button[aria-checked='false'] {
    width: 2vmin;
    height: 2vmin;
    border-radius: 50%;
    border: 1px solid black;
    cursor: pointer;
    background-color: white;
    
}
.active {
    background-color: red;

}

</style>

<div class='wrapper'>

</div>
`;

class radioButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template_rb.content.cloneNode(true));
    const wrapper = this.shadowRoot.querySelector(".wrapper");
    const label = document.createElement("label");
    label.classList.add("label");
    label.innerHTML = this.innerHTML;
    const button = document.createElement("button");
    button.classList.add("toggle");
    button.setAttribute("value", this.getAttribute("value"));
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", "false");
    wrapper.appendChild(button);
    wrapper.appendChild(label);
  }
  connectedCallback() {

  }
}

/*tabLink.forEach(function(item){
    item.addEventListener('click', function(){
        tabLink.forEach(function(item) {
          item.classList.remove('active')
        })
        item.classList.add('active')
    }, false)
}) */
window.customElements.define("radio-button", radioButton);
