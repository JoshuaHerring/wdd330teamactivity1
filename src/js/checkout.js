import renderTotal from "./cartTotal";
import { getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const cartItems = await getLocalStorage("so-cart");

document.querySelector(".itemSubtotal").innerHTML = `(${cartItems.length})`;

const checkout = new CheckoutProcess("so-cart");
await checkout.init();
// console.log(checkout)

renderTotal(cartItems);
