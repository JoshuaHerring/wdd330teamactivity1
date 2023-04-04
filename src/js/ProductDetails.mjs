import ProductData from "./ProductData.mjs";
import { setLocalStorage,   updateBreadCrumbs,  getParam } from "./utils.mjs";

export class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.init();
  }

  async init() {
    // console.log(this.dataSource);
    const product = await this.dataSource.findProductById(this.productId);
    this.product = product;
    console.log(this.product);
    const element = document.querySelector(".product-detail");
    element.innerHTML = await this.renderProductDetails();         

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCartHandler.bind(this));
    }
  

  // add to cart button event handler
  async addToCartHandler(e) {
    console.log(this.dataSource);
    const product = await this.dataSource.findProductById(e.target.dataset.id);
    this.addProductToCart(product);
  }

  async addProductToCart(product) {
    product = await product;
    setLocalStorage("so-cart", this.product);
  }

  async renderProductDetails() {
    return `<h3>${this.product.Brand.Name}</h3>
        
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        
        <img
        class="divider"
        src="${this.product.Images.PrimaryLarge}"
        alt="Marmot Ajax tent"
        />
        
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        
        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
        <button data-id="${this.product.Id}" id="addToCart"> Add To Cart </button>
        </div>`;
  }

  makeButton() {
    const button = document.createElement("button");
    button.classList.add("addToCart");
  }
}
