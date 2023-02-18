export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    let list = await this.dataSource.getData(this.category);
    let htmlString = " ";
    list.forEach(async (element) => {
      htmlString += await this.productCardTemplate(element);
      this.listElement.innerHTML += htmlString;
    });
    await this.productCardTemplate(list);
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
