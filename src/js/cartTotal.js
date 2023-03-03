export default function renderTotal(cartItems) {
  let cartTotal = getTotal(cartItems);
  document.querySelector(
    ".cart-total"
  ).innerHTML = `Pre-total: $${cartTotal.toFixed(2)}`;
}

export function getTotal(cartItems) {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.FinalPrice;
  });

  // toFixed rounds the numbers sometimes to be alittle low or a little high
  // which can affect the tax number
  return total;
}

export function getTaxTotal(cartTotal, shippingCost) {
  let y = cartTotal + shippingCost;
  console.log(cartTotal);
  console.log(shippingCost);
  let taxTotal = y * 0.06;
  return taxTotal;
}

// Use $10 for the first item plus $2 for each additional item for shipping.
export function getShipping(cartItems) {
  let ship = 10 + 2 * (cartItems - 1);
  return ship;
}
