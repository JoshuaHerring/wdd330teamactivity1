import ProductData from "./ProductData.mjs";
import { setLocalStorage, getParam, getLocalStorage } from "./utils.mjs";

export class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    
    this.dataSource = dataSource;
    this.init();
  }

  async init() {
    const product = await this.dataSource.findProductById(this.productId);
    console.log(this.dataSource)
    this.product = product;
    this.product["Quantity"] = 0;
    console.log(this.product)
    const element = document.querySelector(".product-detail");
    element.innerHTML = await this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCartHandler.bind(this));
  

  }

  // add to cart button event handler
  async addToCartHandler(e) {
    const product = await this.dataSource.findProductById(e.target.dataset.id);
    let this_id = product.Id;
    let cart = getLocalStorage("so-cart");
    console.log(this.product);
    
    if(cart == null){
      this.addProductToCart(product);
      this.product.Quantity++;
      console.log(cart)
    } else{
      for(let i = 0; i < cart.length; i++){
        if(cart[i].Id == this_id){
            cart[i].Quantity++;
          } else{
            this.addProductToCart(product);
        }
      }

    }


    // if(this.product.Quantity <= 1){
    //   this.product.Quantity++;
    // }else if(this.product.Quantity > 1){
    //   this.product.Quantity++;
    // }
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
