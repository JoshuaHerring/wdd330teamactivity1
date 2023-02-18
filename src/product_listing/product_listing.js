import ProductData from "../js/ProductData.mjs";
import ProductList from "../js/ProductList.mjs";
import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import { ProductDetails } from "../js/ProductDetails.mjs";

loadHeaderFooter();

const category = getParam("category");

// first create an instance of our ProductData class.
const dataSource = new ProductData();

// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");

// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
await myList.init();

const product = getParam("product");
let details = new ProductDetails(product, dataSource);
console.log(details);

// create an instance of product details
// const productCards = new ProductDetails(product, dataSource);

// finally call the init method to show our products

// productCards.init();
