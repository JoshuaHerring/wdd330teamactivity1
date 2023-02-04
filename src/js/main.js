import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

let data = new ProductData("tents");

let getIndex = document.querySelector(".product-list");

let list = new ProductList("tents", data, getIndex);

let headerFooter = loadHeaderFooter();
