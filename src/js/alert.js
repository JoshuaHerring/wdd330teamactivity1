import { doc } from "prettier";

export default class alert {
  constructor() {
    this.renderAlerts();
  }

  async getAlerts() {
    let response = await fetch("../json/alerts.json");
    let alert = await response.json();

    return alert;
  }

  async checkAlerts() {
    let alert = await this.getAlerts();
    if (alert.length > 0) {
      return alert;
    } else {
      return false;
    }
  }

  async renderAlerts() {
    let alert = await this.checkAlerts();
    if (alert == false) {
      return;
    }

    let holder = document.createElement("section");
    alert.forEach((alert) => {
      let child = document.createElement("p");
      child.innerHTML = alert.message;
      child.style.backgroundColor = alert.background;
      child.style.color = alert.color;
      child.style.textAlign = "center";
      holder.appendChild(child);
    });

    let body = document.querySelector("body");
    // body.prepend(holder);
  }
}
