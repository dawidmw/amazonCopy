import { cart } from "../../data/cartNew.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js"
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary() {
  let productsPriceCents = 0;
  let shippingFeeCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productsPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingFeeCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productsPriceCents + shippingFeeCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalOrderCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = 
    `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cart.calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(productsPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipping-fee-summary">$${formatCurrency(shippingFeeCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalOrderCents)}</div>
      </div>

      <button class="place-order-button button-primary js-order-button">
        Place your order
      </button>
    `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-order-button')
  .addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      }); // what we sent to backend
  
      const order = await response.json(); // what we receive
      addOrder(order);

    } catch(error) {
      console.log('Unexpected error. Try again later.')
    }

    window.location.href = 'orders.html';

  });
};
