import renderTotal from "./cartTotal";
import { getLocalStorage } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart");
console.log(cartItems)

document.querySelector(".itemSubtotal").innerHTML = `(${cartItems.length})`;

renderTotal(cartItems)