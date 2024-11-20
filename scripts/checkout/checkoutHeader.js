import { cart } from "../../data/cartNew.js";


export function renderCheckoutHeader() {
  let quantity;
  
  if (cart.cartItems) {
    quantity = cart.calculateCartQuantity();
  } else {
    quantity = '';
  };
  
  const headerMiddleHTML = `
    Checkout (<a class="return-to-home-link js-checkout-header-link"
    href="amazon.html">${quantity}</a>)
  `

  document.querySelector('.js-header-middle-content').innerHTML = headerMiddleHTML;
};
