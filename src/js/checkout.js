import renderTotal from "./cartTotal";
import { getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const cartItems = getLocalStorage("so-cart");
console.log(cartItems)

document.querySelector(".itemSubtotal").innerHTML = `(${cartItems.length})`;

const checkout = new CheckoutProcess;
await checkout.init();
console.log(checkout)

renderTotal(cartItems)