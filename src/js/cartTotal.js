export default function renderTotal(cartItems){ 
    document.querySelector(".cart-total").innerHTML = `Total: $${getTotal(cartItems)}`;
}

function getTotal(cartItems){
    let total = 0;
    cartItems.forEach(item => {
    total += item.FinalPrice;
    });
    return total;
}

