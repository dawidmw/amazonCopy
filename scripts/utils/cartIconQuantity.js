import { cart } from "../../data/cartNew.js";

export function updateCartQuantityHTML() {
  const cartQuantity = cart.calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
};
