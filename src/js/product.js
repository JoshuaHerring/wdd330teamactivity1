import { setLocalStorage, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { ProductDetails } from "./ProductDetails.mjs";

const dataSource = new ExternalServices("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

product.init();

// const showProduct = product.init();

// add listener to Add to Cart button
// window.onload=function(){

// }
