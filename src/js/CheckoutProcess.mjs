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
  }
  async init() {
    this.list = await getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    this.list.length  = this.itemTotal;
    this.orderTotal
    
  }
  calculateOrdertotal() {
    this.itemTotal = getTotal(this.list);
    this.tax = getTaxTotal(this.list);
    this.shipping = getShipping(this.tax, this.itemTotal);

    // display the totals.
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(".shipEst").innerHtml = this.shipping;
    document.querySelector(".tax").innerHtml = this.tax;
    // document.querySelector(".").innerHtml = this.;

    
  }
  
}