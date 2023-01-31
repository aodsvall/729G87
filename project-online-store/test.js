//this file listens for actions in shadow DOMs and handles them

document.querySelector(".wrapper").addEventListener("custom", (item) => {
  const shoppingCart = document.querySelector("shopping-cart");
  
  const itemClone = item.target.cloneNode(true);
  shoppingCart.addItems(itemClone);
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  document.querySelector(".cart").style.visibility = 'visible';
  setTimeout(() => {
    document.querySelector(".cart").style.visibility = 'hidden';
  }, 3000);
});

document.querySelector("body").addEventListener("custom2", () => { 
    document.querySelector(".buy").style.visibility = 'visible';
    const shoppingCart = document.querySelector("shopping-cart");
    setTimeout(() => {
      document.querySelector(".buy").style.visibility = 'hidden';
    }, 3000);
    shoppingCart.clearCart();
});

