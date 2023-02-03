export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;

        this.path = `../public/json/${this.category}.json`;
        // this.path = `../public/json/${this.dataSource}.json`;

        this.init();
    }

    async init() {
      const list = await this.dataSource.getData();
        console.log(list);
        list.forEach(async element => {
          this.listElement.innerHTML = await this.productCardTemplate(element);
        });
        console.log(this);
        // this.productCardTemplate(list);
    }

    getData() {
      return fetch(this.path)
        .then(convertToJson)
        .then((data) => data);
    }

    async productCardTemplate(product){
        return `<li class="product-card">
    <a href="product_pages/index.html?product=">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
  </li>`
    }
}

