const templateCart = document.createElement("template");
templateCart.innerHTML = `

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
.cart {
    height: 3rem;
    width: 3rem;
    position: fixed;
    z-index: 3;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    background-color: grey;
    border: none;
    border-radius: 5rem;
    outline: none;
    cursor:pointer;
}

.cart:hover {
    transform: translateX(-50%) scale(1.04);
}

.cart:active {
    transform: translateX(-50%) scale(0.96);

}

.cart-wrapper {
    position: absolute;
    top: 0;
    width: 60vw;
    height: 80vh;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}

.cartCard {
    z-index: 1;
    background: white;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    display: grid;
    margin: 0 1rem;
    min-width: 35vmin;
    max-width: 35vmin;
    height: 15vmin;
    border-radius: 0.5rem;
    border: 1px solid lightgrey;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
}

.cartCard > button {
  margin: 2vmin;
}

.cartCard > button.plus {
	grid-row: 2;
	grid-column: 4;
	justify-self: right;
}

.cartCard > button.minus {
	grid-row: 2;
	grid-column: 4;
	justify-self: left;
}

.cartCard > p {
  font-family: monospace;
  font-size: 1rem;
  margin: 0;
}

.cartCard > p.name{
  grid-area: 1 / col1-start / line 2 / 1;
}

.cartCard > p.pprice {
	grid-row: 3;
	grid-column: 4;
  justify-self: center;
}

.cartCard > p.quantity {
	grid-row: 1;
	grid-column: 4;
	justify-self: end;
}

.cartImgContainer {
  justify-self: start;
  width: 30%;
  cursor: pointer;
  grid-area: 2 / col1-start / line 2 / 1;
}

.cartImgContainer > img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

i {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(246, 231, 224);
    font-size: 1.75rem;
}

button {
  width: 1rem;
  justify-self: end;
  cursor: pointer;
  border: none;
  font-family: monospace;
  border-radius: 50%;
}

.price {
  font-family: monospace;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  color: black;
}

.confirm {
  position: absolute;
  bottom: 1rem;
  width: 6rem;
  cursor: pointer;
  border: none;
  font-family: monospace;
  border-radius: 0.1rem;
}

</style>


<div class='cart-wrapper'>

</div>
`;

class cart extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateCart.content.cloneNode(true));


    this.cartWrapper = this.shadowRoot.querySelector(".cart-wrapper");


    //button for oppening and closing shopping cart
    const button = document.createElement("button");
    button.classList.add("cart");
    this.shadowRoot.appendChild(button);
    const openLogo = document.createElement("i");
    const closeLogo = document.createElement("i");
    closeLogo.classList = this.querySelector(".close").classList;
    openLogo.classList = this.querySelector(".open").classList;
    button.appendChild(openLogo);
    button.appendChild(closeLogo);

    //create total price and confirm purchase button
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm");
    confirmButton.innerHTML = "GENOMFÖR KÖP";
    const price = document.createElement("p");
    this.value = 0;
    price.classList.add("price");
    this.shadowRoot.querySelector(".cart-wrapper").appendChild(price);
    this.shadowRoot.querySelector(".cart-wrapper").appendChild(confirmButton);

  }
  connectedCallback() {
    this.shadowRoot.querySelector(".cart").addEventListener("click", () => {
      document.body.dataset.cart =
        document.body.dataset.cart === "true" ? "false" : "true";
      if (document.body.dataset.cart === "true") {
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
        this.showCart();
        this.shadowRoot.querySelector(".open").style.visibility = "hidden";
        this.shadowRoot.querySelector('.price').innerHTML = "Total price: " + (this.value).toFixed(2);
      } else {
        this.hideCart();
        this.shadowRoot.querySelector(".open").style.visibility = "visible";
      }
    });

    this.shadowRoot.querySelector(".confirm").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("custom2", {
          bubbles: true,
          composed: true,
          detail: { string: () => "" },
        })
      );
    });


  }

  showCart() {
    const wrapper = document.querySelector(".wrapper");
    const animeobj = anime({
      targets: wrapper,
      translateY: "80vh",
      easing: "linear",
      duration: 250,
    });
    this.cartWrapper.style.display = "flex";
  }

  hideCart() {
    const wrapper = document.querySelector(".wrapper");
    const animeobj = anime({
      targets: wrapper,
      translateY: "0",
      easing: "linear",
      duration: 250,
    });
    this.cartWrapper.style.display = "none";
    

  }

//adding item to cart
  addItems(item) {

    //Creation of cart object
    const cartCard = document.createElement("div");
    cartCard.classList.add("cartCard");
    this.shadowRoot.querySelector(".cart-wrapper").appendChild(cartCard);
    const cartImgContainer = document.createElement("div");
    cartImgContainer.classList.add("cartImgContainer");
    cartCard.appendChild(cartImgContainer);

    //creation of content
    const cartImg = document.createElement("img");
    const cartName = document.createElement("p");
    cartName.classList.add("name");
    const cartPrice = document.createElement("p");
    cartPrice.classList.add("pprice");
    let cartQuantity = document.createElement('p');
    cartQuantity.classList.add("quantity");
    cartName.innerHTML = item.children[1].innerHTML;
    cartImg.src = item.children[0].src;
    cartPrice.innerHTML = item.children[2].innerHTML;
    cartImgContainer.appendChild(cartImg);
    cartCard.appendChild(cartName);
    const plusItem = document.createElement("button");
    plusItem.classList.add("plus");
    plusItem.innerHTML = "+";
    const minusItem = document.createElement("button");
    minusItem.classList.add("minus");
    minusItem.innerHTML = "-";
    const amount = document.createElement('p');
    cartQuantity.innerHTML = 1;
    cartCard.appendChild(plusItem);
    cartCard.appendChild(minusItem);
    cartCard.appendChild(cartPrice);
    cartCard.appendChild(cartQuantity);
    this.value += Number(cartPrice.innerHTML);
    
    
    this.shadowRoot.querySelectorAll(".cartCard").forEach((cartWindow) => {
      // Identifiera plusknappen
      let plusSign = cartWindow.querySelector(".plus");

      let pprice = cartWindow.querySelector('.pprice');
      // Identifiera minusknappen
      let minusSign = cartWindow.querySelector(".minus");

      plusSign.addEventListener("click", () => {
        // klickevent adderar quant
        cartWindow.querySelector('.quantity').innerHTML++;
        this.value += Number(pprice.innerHTML);
        this.shadowRoot.querySelector('.price').innerHTML = "Total price: " + (this.value).toFixed(2);
      });

      minusSign.addEventListener("click", () => {
        // klickevent subtraherar quant
        cartWindow.querySelector('.quantity').innerHTML--;
        this.value -= Number(pprice.innerHTML);
        if (this.value < 0) {
          this.value = 0;
        }
        this.shadowRoot.querySelector('.price').innerHTML = "Total price: " + (this.value).toFixed(2);
        if(cartWindow.querySelector('.quantity').innerHTML < 1) {
          this.shadowRoot.querySelector('.cart-wrapper').removeChild(cartWindow);
        }
      });
    });


  }


  clearCart() {
    this.hideCart();
    const cartWrapper = this.shadowRoot.querySelector(".cart-wrapper");
    const cartItems = cartWrapper.querySelectorAll(".cartCard");
    cartItems.forEach((item) => {
        cartWrapper.removeChild(item);
    }); 
  }

  getItems() {
    return this.shadowRoot.querySelector('.cart-wrapper').children;
  }
}

window.customElements.define("shopping-cart", cart);
