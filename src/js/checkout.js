import renderTotal from "./cartTotal";
import { getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const cartItems = getLocalStorage("so-cart");

document.querySelector(".itemSubtotal").innerHTML = `(${cartItems.length})`;

const checkout = new CheckoutProcess("so-cart");

renderTotal(cartItems);
