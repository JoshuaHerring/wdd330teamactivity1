import ExternalServices from "./ExternalServices.mjs";

function orderTemplate(){
    let orders =  `<h2>Current Order</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th></tr>
    </thread>
    <tbody class="order-body"></tbody>
    </table>`;

    return orders;
}

export default class Admin {
    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
    }

    async login(next) {
        console.log("up");
        try {
            this.token = await this.services.loginRequest({email:"user1@email.com",password:"user1"});
            this.showOrders();
            console.log(await this.token);
        } 
        catch(err) {
            console.log(err);
        }
    }

    async showlogin() {
        let sform = document.getElementById('login');
        let loginInfo = `<fieldset> 
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required value="user1@email.com">
        <br>
        <label for="pass">Password</label>
        <input id="pass" name="pass" type="password" required value="user1">
        <br>
        <input id="loginButton" type="button" value="Submit">
        </fieldset>`;
        sform.innerHTML = loginInfo;
        const formInfo = document.getElementById("loginButton");
        formInfo.addEventListener("click", this.login.bind(this));
    }

    async showOrders() {
        try {
            const orders = await this.services.getOrders(this.token);
            console.log(orders);
            this.mainElement.innerHTML = orderTemplate();
            const parent = document.querySelector("#orders");
            parent.innerHTML = orders
                .map(
                    (order) =>
                        `<tr><td>${order.id}</td><td>${new Date(
                            order.orderDate
                        ).toLocaleDateString("en-US")}</td><td>${
                            order.items.length
                        }</td><td>${order.orderTotal}</td></tr>`
                )
                .join("");
        } catch (err) {
            console.log(err);
        }
    }
}
