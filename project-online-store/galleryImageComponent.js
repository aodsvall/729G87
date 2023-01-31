const templateGalleryImage = document.createElement("template");
templateGalleryImage.innerHTML = `

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
.gallery-image-container {
    justify-self: center;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 70%;
    cursor: pointer;
}

.gallery-image-container > img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    webkit-filter: drop-shadow(3px 4px 3px #222);
    filter: drop-shadow(3px 4px 3px #222);
}

.card {
  position: relative;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    display: grid;
    grid-template-rows: 7fr 1fr 1fr 1fr;
    margin: 2rem 1rem;
    width: 25vmin;
    height: 39vmin;
    border-radius: 0.5rem;
    border: 1px solid lightgrey;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
} 

.gallery-image-container:active {
  transform: scale(0.9);
  cursor: pointer;
  
}


button {
    width: 4rem;
    justify-self: end;
    margin: 1rem;
    cursor: pointer;
    border: none;
    font-family: monospace;
}

button:active {
    transform: scale(0.6);
}

button:hover {
    transform: scale(1.04);
}

p {
    margin: 1rem;
    font-family: monospace;
}

.price {
    justify-self: end;
}

.product-name {
    font-size: 1rem;
    font-weight: bold;
}

.product {
  position: absolute;
  z-index: 2;
  top: -25%;
  left: 50%;
  transform: translateX(-50%);
  width: 40rem;
  height: 60vh;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  border: 1px solid lightgrey;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.product > p {
  grid-row: 2;
  grid-column: 3;
  text-align: center;
}

.closeButton {
  position: absolute;
  top: 0;
  right: 0;
}

.product > .buyButton {
  position: absolute;
  bottom: 0;
  right: 0;
}

h3 {
  font-family: monospace;
}

.product > h3 {
  text-align: center;
  align-self: flex-end;
  grid-row: 1;
  grid-column: 3;
}

.mainImgContainer {
  grid-row: 1 / span 3;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  cursor: pointer;
  width: 30vmin;
  height: 30vmin;

}

.smallImgContainer {
  justify-self: center;
  display: flex;
  grid-row: 4;
  grid-column: 1;
  justify-content: space-between;
  align-items: flex-start;
  width: 70%;
  cursor: pointer;
  width: 20vmin;
  height: 20vmin;
}

.productImg{
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  -webkit-filter: drop-shadow(3px 4px 3px #222);
  filter: drop-shadow(3px 4px 3px #222);
}


</style>


<div class="card">
</div>

`;

class galleryImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateGalleryImage.content.cloneNode(true));
    const card = this.shadowRoot.querySelector(".card");
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("gallery-image-container");
    card.appendChild(imgContainer);

    this.querySelectorAll(".main-img").forEach((image, index) => {
      const img = document.createElement("img");
      img.id = image.id;
      const productInfo = document.createElement("div");
      productInfo.classList.add("product");
      productInfo.setAttribute("labeledby", image.id);
      productInfo.innerHTML = image.id;
      productInfo.style.visibility = "hidden";
      img.src = image.src;
      imgContainer.appendChild(img);
      card.appendChild(productInfo);
    });

    //Product info page functionality
    this.shadowRoot.querySelectorAll(".product").forEach((product) => {
      const closeButton = document.createElement("button");
      const infoBuyButton = document.createElement("button");
      const description = document.createElement("h3");
      description.innerHTML = "Description";
      const descriptionContent = document.createElement("p");
      descriptionContent.innerHTML =
        this.querySelector(".description").innerHTML;
      closeButton.innerHTML = "STÄNG";
      infoBuyButton.innerHTML = "KÖP";
      infoBuyButton.classList.add("buyButton");
      closeButton.classList.add("closeButton");
      const mainImgContainer = document.createElement("div");
      mainImgContainer.classList.add("mainImgContainer");
      product.appendChild(mainImgContainer);

      const smallImgContainer = document.createElement("div");
      smallImgContainer.classList.add("smallImgContainer");
      this.querySelectorAll(".product-image").forEach((image, index) => {
        const productImg = document.createElement("img");
        productImg.classList.add('productImg');
        productImg.src = image.src;
        if (index == 0) {
          this.shadowRoot
            .querySelector(".mainImgContainer")
            .appendChild(productImg);
        } else {
          
          smallImgContainer.appendChild(productImg);
          product.appendChild(smallImgContainer);
          index++;
        }
      });
      product.appendChild(closeButton);
      product.appendChild(infoBuyButton);
      product.appendChild(description);
      product.appendChild(descriptionContent);
    });

    const buyButton = document.createElement("button");
    buyButton.classList.add("buyButton");
    const price = document.createElement("p");
    price.classList.add("price");
    const productName = document.createElement("p");
    productName.classList.add("product-name");
    price.innerHTML = this.querySelector(".price").innerHTML;
    productName.innerHTML = this.querySelector(".product-name").innerHTML;
    card.appendChild(productName);
    card.appendChild(price);
    card.appendChild(buyButton);
    buyButton.innerHTML = "KÖP";
  }
  connectedCallback() {
    this.shadowRoot.querySelectorAll(".closeButton").forEach((closeButton) => {
      closeButton.addEventListener("click", () => {
        closeButton.parentElement.style.visibility = "hidden";
      });
    });

    const img = this.shadowRoot.querySelector("img");
    this.shadowRoot.querySelectorAll("img").forEach((img) => {
      img.addEventListener("click", () => {
        this.shadowRoot.querySelectorAll(".product").forEach((product) => {
          if (img.id == product.getAttribute("labeledby")) {
            product.style.visibility = "visible";
          }
        });
      });
    });
    img.addEventListener("mouseover", () => {
      this.hoverOver(img);
    });
    img.addEventListener("mouseleave", () => {
      this.revert(img);
    });

    this.shadowRoot.querySelectorAll(".buyButton").forEach((button) => {
      button.addEventListener("click", () => {
        this.shadowRoot.querySelector('.product').style.visibility = "hidden";
        this.dispatchEvent(
          new CustomEvent("custom", {
            bubbles: true,
            composed: true,
            detail: { node: () => this.shadowRoot.querySelector(".card") },
          })
        );
      });
    });

    // Ny kod börjar här <----
    // Hitta alla produktfönster
    this.shadowRoot.querySelectorAll(".product").forEach((productWindow) => {

      // Identifiera den stora bilden uppe till vänster
      let mainImage = productWindow.querySelector(".mainImgContainer > .productImg");

      // Identifiera de små bilderna nedanför + addEventListeners
      let smallImages = productWindow.querySelectorAll(".smallImgContainer > .productImg");

      smallImages.forEach((smallImage) => {
        smallImage.addEventListener("click", (event) => {
          // Spara den stora bildens sökväg temporärt så den inte tappas bort
          // när vi byter bort den
          let mainImageSrc = mainImage.src;

          // Byt ut den stora bilden mot den lilla (klickade) bilden.
          mainImage.src = event.target.src;

          // Byt ut den lilla bilden mot den stora bilden som vi sparade
          event.target.src = mainImageSrc;
        });
      });
    });

    // Ny kod slutar här <---
  }

  hoverOver(target) {
    const animeObj = anime({
      targets: target,
      scale: "1.10",
      easing: "linear",
      duration: 200,
    });
  }

  revert(target) {
    const animeObj = anime({
      targets: target,
      scale: "1",
      easing: "linear",
      duration: 200,
    });
  }
}

window.customElements.define("gallery-image", galleryImage);
