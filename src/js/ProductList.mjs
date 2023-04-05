export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;

    // this.path = `../public/json/${this.category}.json`;
    // this.path = `../public/json/${this.dataSource}.json`;

    this.init();
  }

  async init() {
    let list = await this.dataSource.getData(this.category);
    // let product = list[0].Id;
    // console.log(product)
    // console.log(list)
    var htmlString = " ";
    list.forEach(async (element) => {
      htmlString += await this.productCardTemplate(element);
      // console.log(htmlString);
      this.listElement.innerHTML += htmlString;
    });
    // console.log(this);
    this.productCardTemplate(list);
  }

  // remTent(list){
  //   return list.filter((item) =>
  //   item.Id == "880RR" || item.Id == "985RF" || item.Id == "985PR" || item.Id == "344YJ"
  //   );
  // }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  // searchinh for a product and displaying the results
async searchProduct(key) {
  const searchInstert = document.querySelector("#search-products");
  searchInstert.innerHTML = "";
  const list = await this.dataSource.getData(this.category);
  const filteredList = this.filterProduct(list);
  const products = filteredList.filter(item => item.Name.toLowerCase().includes(key.toLowerCase()));
  const render = products.map(this.productCardTemplate);
  searchInstert.insertAdjacentHTML("afterbegin", render.join(""));
}

  showModal(productId) {
    const item = this.filteredList.filter(
      (product) => product.Id === productId
    );
    this.mainElement.insertAdjacentHTML(
      `beforebegin`,
      this.productCardModal(item[0]),
    );
    document.querySelector(`.product-bg`).addEventListener(`click`, () => {
      // alert("Test");
      // TODO: add event listener for removing modal
      document.querySelector(`.product-bg`).remove();
    });
  }

  productCardTemplate(product) {
    return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
            <img
              src="${product.Images.PrimaryLarge}"
              alt="Image of ${product.Name} "
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__markup">$${product.SuggestedRetailPrice}</p>
            <h3 class="product-card__price">$${product.FinalPrice}</h3>
            </a>
            <button class="lookup-button" data-id="${product.Id}">Look Up</button>
          </li>`;
  }

  productCardModal(product) {
    return `
    <div class="product-bg">
    <div class="product-modal">
    <div>
    <h1>${product.Brand.Name}</h1>
    <a href="../product_pages/index.html?product=${product.Id}">More details</a>
    </div>
    <div>
    <picture>
    <source media="(min-width: 650px) and (max-width: 899px)" srcset="${product.Images.PrimaryLarge}">
    <source media="(min-width: 900px)" srcset="${product.Images.PrimaryExtraLarge}">
    <img
    class="divider"
    src="${product.Images.PrimaryMedium}"
    alt="${product.Name}"
    />
    </picture>
    <h3 class="product-card__markup">$${product.SuggestedRetailPrice}</h3>
    <h2 class="product-card__price">$${product.FinalPrice}</h2>
    
    <p class="product__color">${product.Colors[0].ColorName}</p>
    
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    </div>
    </div>
    </div>`;
  }
}
