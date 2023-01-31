const template = document.createElement("template");
template.innerHTML = `   
    <style>
    .radio-group {
        display: flex;
        flex-direction : column;
        justify-content: space-around;
        width: 35vmin;
        height: 35vmin;
        margin: 20px;
        background-color: pink;
        border-radius: 5%;
    }
    </style>
    <div class='radio-group'></div>
`;

class radioGroup extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.querySelectorAll("radio-button").forEach((elem) => {
      this.shadowRoot.querySelector(".radio-group").appendChild(elem);
    });
}
}
window.customElements.define("radio-group", radioGroup);
