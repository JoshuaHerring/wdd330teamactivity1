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
        // console.log(this.dataSource);
        const product = await this.dataSource.findProductById(this.productId);
        this.product = product;
        // console.log(product)
        const element = document.querySelector(".product-detail");
        element.innerHTML = this.renderProductDetails();

        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCartHandler.bind(this));

    }

   // add to cart button event handler
    async addToCartHandler(e) {
    console.log(this.dataSource);
    const product = await this.dataSource.findProductById(e.target.dataset.id);
    this.addProductToCart(product);

    document.querySelector(`.product-card__carousel`).innerHTML =
    this.renderCarousel(this.product);
  }

    async addProductToCart(product) {
        product = await product;
        setLocalStorage("so-cart", this.product);
    }

    renderProductDetails(){
        
        return `<h3>${this.product.Brand.Name}</h3>
        
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        
        <img
        class="divider"
        src="${this.product.Image}"
        alt="Marmot Ajax tent"
        />
        
        <div class="divider product-card__carousel">
        </div>

        <p class="product-card__price"${this.product.FinalPrice}</p>
        
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        
        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
        <button data-id="${this.product.Id}" id="addToCart"> Add To Cart </button>
        </div>`

        
    }

    renderCarousel(product) {
      const images = product.Images.ExtraImages;
      const section = document.createElement(`div`);
    
    // makeButton(){
    //     const button = document.createElement("button");
    //     button.classList.add("addToCart");
        
    // }
    
        // First Img
        const firstImg = document.createElement(`div`);
        firstImg.setAttribute("class", "product-card__carousel-image");
        firstImg.innerHTML = `
          <img src="" alt="" data-src="">
          `;
        section.appendChild(firstImg);
    
        // Additional Images
        images.forEach((item) => {
          const imageDiv = document.createElement(`div`);
          imageDiv.setAttribute("class", "product-card__carousel-image");
          imageDiv.innerHTML = `
          <img src="" alt="" data-src="">
          `;
          section.appendChild(imageDiv);
        });
        return section.innerHTML;
      }
}

