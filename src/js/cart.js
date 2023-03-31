import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import renderTotal from "./cartTotal.js";

loadHeaderFooter();

// create an array of id's
let ids = [];

function renderCartContents() {
  
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems[0].Quantity);
  
  
  // add all the item id's from the cart into
  // the array ids=[]
  for(let i = 0; i < cartItems.length; i++){
    ids.push(cartItems[i].Id)
    if (ids.includes(cartItems[i].Id)){
      console.log(cartItems[i].Id)

    }
    
  }


  // removes error for when cart is empty
  if(cartItems == null){
    let htmlItems = null;
  }else{
    let htmlItems =  cartItems.map((item) => 
    cartItemTemplate(item));
      

    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
    if(cartItems.length > 0){
      document.querySelector(".cart-footer").classList.remove('hide');
    }
    renderTotal(cartItems);
  }
}

function removeCartItem(items){

  localStorage.removeItem(id)

}



function cartItemTemplate(item) {
  console.log(item)
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
  <h2 class="card__name">${item.Name}</h2>
  </a>
  <button id="cartButton"> X </button>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

renderCartContents();
let remove = document.querySelector("#cartButton");
// remove.addEventListener("click", removeCartItem('so-cart'))
