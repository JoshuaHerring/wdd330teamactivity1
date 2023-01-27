import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { ProductDetails } from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

// const showProduct = product.init();



// add listener to Add to Cart button
// window.onload=function(){


// }
