import { getShipping, getTaxTotal, getTotal } from "./cartTotal";
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  console.log(simplifiedItems);
  return simplifiedItems;
}

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.fTotal = 0;
    this.init();
  }
  async init() {
    this.list = await getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
    const element = document.getElementById("submit");
    element.addEventListener("click", (e) => {
      e.preventDefault()
      this.checkout.bind(this)
    });
  }
  calculateItemSummary() {
    this.itemTotal = this.list.length;
  }
  calculateOrdertotal() {
    this.orderTotal = getTotal(this.list);
    this.shipping = getShipping(this.itemTotal);

    // affected by the rounded total
    this.tax = getTaxTotal(this.orderTotal, this.shipping).toFixed(2);

    this.fTotal =
      parseFloat(this.orderTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax);

    // display the totals.
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(".shipEst").innerHTML = `$${this.shipping}`;
    document.querySelector(".tax").innerHTML = `$${this.tax}`;
    document.querySelector(".finalTotal").innerHTML = `$${this.fTotal.toFixed(
      2
    )}`;
  }

  async checkout() {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    console.log(this.list);
    // call the checkout method in our ExternalServices module and send it our data object.

    const formElement = document.forms["checkout"];
    console.log(formElement);
    const json = formDataToJSON(formElement);

    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);

    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
