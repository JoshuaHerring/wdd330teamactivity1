import { getShipping, getTaxTotal, getTotal } from "./cartTotal";
import { getLocalStorage } from "./utils.mjs";

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
    // this.init();
  }
  async init() {
    this.list = await getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
  }
  calculateItemSummary() {
    this.itemTotal = this.list.length;
  }
  calculateOrdertotal() {
    this.orderTotal = getTotal(this.list);
    this.shipping = getShipping(this.itemTotal);

    // affected by the rounded total
    this.tax = getTaxTotal(this.orderTotal, this.shipping).toFixed(2);

    this.fTotal = (
      parseFloat(this.orderTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);

    // display the totals.
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(".shipEst").innerHTML = `$${this.shipping}`;
    document.querySelector(".tax").innerHTML = `$${this.tax}`;
    document.querySelector(".finalTotal").innerHTML = `$${this.fTotal}`;
  }
}
