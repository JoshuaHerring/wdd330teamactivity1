import ProductData from './ProductData.mjs';
import { setLocalStorage, getParam } from "./utils.mjs";

export class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        this.init();
    }

    async init(){
        const product = await this.dataSource.findProductById(this.productId);
        this.product = product;
        console.log(product)
        const element = document.querySelector(".product-detail");
        element.innerHTML = this.renderProductDetails();
    }

    async addProductToCart(product) {
        setLocalStorage("so-cart", product);
    }

    renderProductDetails(){
        return `<h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${this.product.Image}"
          alt="Marmot Ajax tent"
        />

        <p class="product-card__price"${this.product.FinalPrice}</p>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>

        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="880RR">Add to Cart</button>
        </div>`
    }
    
}