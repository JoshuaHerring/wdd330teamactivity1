import ProductData from "./ProductData.mjs";
import { setLocalStorage, getParam } from "./utils.mjs";

export class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.init();
  }
  
  async init(breadcrumb = true) {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector(`.product-detail`).innerHTML = this.renderProductDetails(this.product);
    if (breadcrumb){
      updateBreadCrumbs(
        `
        <a href="/product-listing">Home</a> / <a href="/product-listing/?category=${this.product.Category}">${this.product.Category}</a> / ${this.product.NameWithoutBrand}`
      )
    }
    console.log(this.product);
    document.querySelector(`.product-detail`).innerHTML =
      this.renderProductDetails(this.product);

    document.querySelector(`.product-card__carousel`).innerHTML =
      this.renderCarousel(this.product);

    document.querySelector(`.product-card__colors`).innerHTML =
      this.renderColorSwitch(this.product);

    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));

    // add listener for images
    document.querySelectorAll("[data-src]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Hi");
        // switch
        this.handleImageClick(item.dataset.src);
      });
    });
  }

  handleImageClick(data) {
    // get all source
    const sourcesets = document.querySelectorAll(`source`);
    // crete handler for current mainImg's data-src
    // switch images
    document.querySelector(`.product-card__mainImg`).dataset.src = data;
    document.querySelector(`.product-card__mainImg`).src = data;
    // set source for sources
    sourcesets.forEach((item) => {
      item.srcset = data;
    });
  }

  // add to cart button event handler
  addToCart(e) {
    const colorValue = document.querySelector(`select`).value;
    // Get from storage - this.products
    this.products =
      getLocalStorage(`so-cart`) === null ? [] : getLocalStorage(`so-cart`);
    // Check if item is in this.products
    if (
      this.products.find(
        (item) => item.Id === this.product.Id && item.Colors === colorValue
      )
    ) {
      // If it is in this.products, add qty + 1
      this.products.map((item) => {
        if (item.Id === this.product.Id) {
          item.Quantity += 1;
        }
        return item;
      });
    } else {
      // else: add qty key
      const prod = { ...this.product, Quantity: 1, Colors: colorValue };
      this.products = [...this.products, prod];
    }
    // Set local storage
    setLocalStorage(`so-cart`, this.products);

    const badge = this.renderSuperscript(this.products);
    const bagParent = document.querySelector(`.cart a`);

  }

  renderProductDetails(product) {
    const newItem = `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <picture>
        <source media="(min-width: 650px) and (max-width: 899px)" srcset="${product.Images.PrimaryLarge}">
        <source media="(min-width: 900px)" srcset="${product.Images.PrimaryExtraLarge}">
        <img
          class="divider product-card__mainImg"
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
          data-src="${product.Images.PrimaryMedium}"
        />
      </picture>

      <div class="divider product-card__carousel">
      </div>

      <div class="divider product-card__colors"></div>

      <h3 class="product-card__markup">$${this.product.SuggestedRetailPrice}</h3>
      <h2 class="product-card__price">$${this.product.FinalPrice}</h2>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
      </div>`;
    return newItem;
  }

  renderCarousel(product) {
    const images = product.Images.ExtraImages;
    const section = document.createElement(`div`);

    // First Img
    const firstImg = document.createElement(`div`);
    firstImg.setAttribute("class", "product-card__carousel-image");
    firstImg.innerHTML = `
      <img src="${product.Images.PrimaryLarge}" alt="${product.Name}" data-src="${product.Images.PrimaryExtraLarge}">
      `;
    section.appendChild(firstImg);

    // Extra Images
    images.forEach((item) => {
      const imageDiv = document.createElement(`div`);
      imageDiv.setAttribute("class", "product-card__carousel-image");
      imageDiv.innerHTML = `
      <img src="${item.Src}" alt="${item.Title}" data-src="${item.Src}">
      `;
      section.appendChild(imageDiv);
    });
    return section.innerHTML;
  }

  renderColorSwitch(product) {
    const colors = product.Colors;
    const tempDiv = document.createElement(`div`);
    const select = document.createElement(`select`);
    colors.forEach((item) => {
      const option = document.createElement(`option`);
      option.setAttribute(`value`, item.ColorName);
      option.innerHTML = `${item.ColorName}`;
      select.appendChild(option);
    });

    tempDiv.appendChild(select);
    return tempDiv.innerHTML;
  }
}
