import { cart } from "../../data/cartNew.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary() {
  let cartHTML = '';

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id} js-cart-item-container" >
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  
  document.querySelector('.js-order-summary').innerHTML = cartHTML;
  renderCheckoutHeader(cart.calculateCartQuantity());

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = calculateDeliveryDate(deliveryOption);

      const deliveryPrice = deliveryOption.priceCents === 0 ? "FREE -" : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html += `
        <div class="delivery-option js-delivery-option 
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" 
        data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">

          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input 
          js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}" 
          name="${matchingProduct.id}">

          <div>
            <div class="delivery-option-date js-option-date-${matchingProduct.id}-${deliveryOption.id}">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price js-option-price-${matchingProduct.id}-${deliveryOption.id}">
              ${deliveryPrice} ${deliveryOption.deliveryDays} Days Shipping
            </div>
          </div>

        </div>
      `;
    });

    return html;
  };


  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      cart.deleteProductFromCart(productId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      let containerClassList = document.querySelector(`.js-cart-item-container-${productId}`);
      containerClassList.classList.add('is-editing-quantity');

      let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = '';
    });
  });

  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      let containerClasList = document.querySelector(`.js-cart-item-container-${productId}`);
      containerClasList.classList.remove('is-editing-quantity');

      const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

      updateQuantity(productId, newQuantity);

      let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;

      cart.updateQuantity();
      console.log(cart);
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });
};
