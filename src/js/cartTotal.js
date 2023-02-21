export default function renderTotal(cartItems){ 
    let cartTotal = getTotal(cartItems)
    document.querySelector(".cart-total").innerHTML = `Total: $${cartTotal}`;
}

export function getTotal(cartItems){
    let total = 0;
    cartItems.forEach(item => {
    total += item.FinalPrice;
    });
    return total;
}


export function getTaxTotal(cartTotal){
    let taxTotal = cartTotal * 0.06;
    return taxTotal;
}


// Use $10 for the first item plus $2 for each additional item for shipping.
export function getShipping(cartItems){
    let ship;
    if(cartItems.length == 1){
        ship = 10;
    } else if(cartItems.length > 1){
        ship = 10 + (2 * (cartItems.length - 1))
    }
    return ship;
}