import ExternalServices from "../js/ExternalServices.mjs";
import ProductList from "../js/ProductList.mjs";
import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import { ProductDetails } from "../js/ProductDetails.mjs";

loadHeaderFooter();

const category = getParam("category");

// first create an instance of our ExternalServices class.
const dataSource = new ExternalServices();

// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");

// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
console.log(myList);
myList.init();                  

const product = getParam("product");
let details = new ProductDetails(product, dataSource);
console.log(details);

// create an instance of product details
// const productCards = new ProductDetails(product, dataSource);

// finally call the init method to show our products

// productCards.init();

// var discount = 0;
// for (var i = 0; i < prices.length; i++) {
//   var cutPrices = prices[i].innerText.split(" ");
//   var price = Number(cutPrices[3]);
//   var specialprice = Number(cutPrices[5]);
//   var discount = discount + (price - specialprice);
// }
// var totalPriceElement = document.createElement("p");
// var totalPriceElementNode = document.createTextNode(
//   "Total discount: $" + discount + ".00"
// );
// totalPriceElement.style.color = "red";
// totalPriceElement.style.fontWeight = "bold";
// totalPriceElement.appendChild(totalPriceElementNode);
// totalPrice.prepend(totalPriceElement); ``


const dataSource = new ProductData();
const productListElement = document.querySelector(".product-list");
const productList = new ProductListing(category, dataSource, productListElement);

productList.init();

