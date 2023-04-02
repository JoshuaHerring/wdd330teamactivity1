import { updateBreadCrumbs } from "./utils.mjs";

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

  renderList(list) {
    const render = list.map(this.productCardTemplate);
    this.listElement.insertAdjacentHTML("afterbegin", render.join(""));
    updateBreadCrumbs(`${this.category}->(${list.length} items)`);
  }

  async productCardTemplate(product) {
    return `<li class="product-card">

    <a href="/product_listing/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
  </li>`;
  }
}

