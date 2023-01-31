const templateSlideShow = document.createElement("template");
templateSlideShow.innerHTML = `

    <style>
        .slide-show {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 60vw;

        }

        button {
            width: 10vmin;
            height: 5vmin;
            margin: 0 10vmin;

        }

        .img-container {
            height: 30vmin;
            overflow: hidden;

        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            cursor: pointer;
        }

        .arrow {
          display: inline-block;
          width: 15px;
          height: 15px;
          border-top: 2px solid grey;
          border-right: 2px solid grey;
          margin: 0 1vmin;
        }

        .arrow-right {
          transform: rotate(45deg);
        }
        
        .arrow-left {
          transform: rotate(-135deg);
        }

        .arrow-left:hover {
          transform: rotate(-135deg) scale(1.10);
          border-top: 2px solid black;
          border-right: 2px solid black;
          cursor: pointer;
        }
      
        .arrow-left:active {
          transform: rotate(-135deg) scale(0.96);
        }        
        
        .arrow-right:hover {
          transform: rotate(45deg) scale(1.10);
          border-top: 2px solid black;
          border-right: 2px solid black;
          cursor: pointer;
        }
      
        .arrow-right:active {
          transform: rotate(45deg) scale(0.96);
        }

    </style>
    <div class="slide-show">
    </div>


`;

class SlideShow extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateSlideShow.content.cloneNode(true));
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const previousButton = document.createElement("span");
    previousButton.classList.add("arrow-left");
    previousButton.classList.add("arrow");
    const nextButton = document.createElement("span");
    nextButton.classList.add("arrow-right");
    nextButton.classList.add("arrow");
    this.shadowRoot.querySelector(".slide-show").appendChild(previousButton);
    this.shadowRoot.querySelector(".slide-show").appendChild(imgContainer);
    this.shadowRoot.querySelector(".slide-show").appendChild(nextButton);

    this.querySelectorAll("img").forEach((image, index) => {
      const img = document.createElement("img");
      img.src = image.src;
      this.shadowRoot.querySelector(".img-container").appendChild(img);
      if(index == 0) {
        img.hidden = false;
      } else {
        img.hidden = true;
      }
    });
  }
  connectedCallback() {
    let imageIndex = 0;
    this.shadowRoot.querySelector(".arrow-right").addEventListener("click", () => {
        const imgIterator = this.shadowRoot.querySelector('.img-container').childElementCount;
        console.log(imgIterator);
        for(let i = 0; i < imgIterator; i++) {
            this.shadowRoot.querySelector('.img-container').children[i].hidden = true;
        }
        imageIndex++;
        if(imageIndex > (imgIterator-1)) {
          imageIndex = 0;
        }
        this.shadowRoot.querySelector('.img-container').children[imageIndex].hidden = false;
      });
    this.shadowRoot.querySelector(".arrow-left").addEventListener("click", () => {
        const imgIterator = this.shadowRoot.querySelector('.img-container').childElementCount;
        for(let i = 0; i < imgIterator; i++) {
            this.shadowRoot.querySelector('.img-container').children[i].hidden = true;
        }
        imageIndex--;
        if(imageIndex < 0) {
            imageIndex = (imgIterator-1);
        }
        this.shadowRoot.querySelector('.img-container').children[imageIndex].hidden = false;
      });
  } 
}

window.customElements.define("slide-show", SlideShow);
