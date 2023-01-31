const template = document.createElement("template");
template.innerHTML = `

<style>
    button {
        border: 0.1em solid rgba(112,128,144,255);
        background-color: white;
        cursor: pointer;
        margin: 0 0.1rem;

    }

    button::hover {
        background-color: lightgrey;
    }

    button[aria-selected='true'] {
        background-color: rgba(112,128,144,255);
        color: white;

    }
    [role='tabpanel'] {
        border: 0.1em solid rgba(112,128,144,255);
        padding: 0.4rem;
    }
</style>

<div class="tabs">
  <div role="tablist">
  </div>
</div>
`;

class Tab extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.querySelectorAll("h2").forEach((h2, index) => {

      const button = document.createElement("button");
      button.id = 'tab-' + (index+1);
      button.setAttribute("role", "tab");
      button.innerHTML = h2.innerHTML;
      if ((index == 0)) {
        button.setAttribute('aria-selected', 'true');
      } else {
        button.setAttribute("aria-selected", "false");
      }
      button.setAttribute("aria-controls", "panel-" + (index+1));
      this.shadowRoot.querySelector('[role="tablist"]').appendChild(button);
    });
    this.querySelectorAll("div").forEach((div, index) => {
      const container = document.createElement("div");
      this.shadowRoot.querySelector(".tabs").appendChild(container);
      container.innerHTML = div.innerHTML;
      container.id = "panel-" + (index+1);
      container.setAttribute("role", "tabpanel");
      container.setAttribute("aria-labeledby", "tab-" + (index+1));
      container.hidden = true;
    });
    this.shadowRoot.querySelector('#panel-1').hidden = false;
  }
  connectedCallback() {
    this.shadowRoot.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            this.shadowRoot.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
                if(button.id == panel.getAttribute('aria-labeledby')) {
                    for(let i= 0; i < this.shadowRoot.querySelector('[role="tablist"]').children.length; i++) {
                        this.shadowRoot.querySelector('[role="tablist"]').children[i].setAttribute('aria-selected', 'false');
                    }
                    button.setAttribute('aria-selected', 'true');
                    panel.hidden = false;
                } else {
                    panel.hidden = true;

                }
            });
        });
    });
  }

}



window.customElements.define("tabs-component", Tab);
