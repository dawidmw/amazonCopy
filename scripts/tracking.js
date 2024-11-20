import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { updateCartQuantityHTML } from "./utils/cartIconQuantity.js";
import { loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


await loadProductsFetch();

function renderTrackingPage() {

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const fullProductInfo = getProduct(productId);

    let fullOrderInfo = '';
    orders.forEach((order) => {
      if (order['id'] === orderId) {
        fullOrderInfo = order;
      }
    });

    let trackedItem = '';
    const productsInOrder = fullOrderInfo['products'];
    productsInOrder.forEach((product) => {
      if (product['productId'] === productId) {
        trackedItem = product;
      }
    });

    const today = dayjs();
    const testOrderDate = dayjs(fullOrderInfo['orderTime']);
    const productDeliveryTime = dayjs(trackedItem['estimatedDeliveryTime']);

    const progressBarWidth = ((today - testOrderDate) / (productDeliveryTime - testOrderDate) * 100);
    const fakeBar = 100;
    let progressBar = fakeBar;

    let trackingHTML = 
    `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${productDeliveryTime.format('dddd, MMMM DD')}
      </div>

      <div class="product-info">
        ${fullProductInfo['name']}
      </div>

      <div class="product-info">
        Quantity: ${trackedItem['quantity']}
      </div>

      <img class="product-image" src="${fullProductInfo['image']}">

      <div class="progress-labels-container">
        <div class="progress-label-preparing js-preparing-label">
          Preparing
        </div>
        <div class="progress-label-shipped js-shipped-label current-status">
          Shipped
        </div>
        <div class="progress-label-delivered js-delivered-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar"></div>
      </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
    document.querySelector('.js-progress-bar').style.width = `${fakeBar}%`;

    const preparingLabel = document.querySelector('.js-preparing-label');
    const shippedLabel = document.querySelector('.js-shipped-label');
    const deliveredLabel = document.querySelector('.js-delivered-label');

    if (progressBar < 50) {
      removeLabels();
      preparingLabel.classList.add('current-status');
    } else if (progressBar >= 50 && progressBar < 100) {
      removeLabels();
      shippedLabel.classList.add('current-status');
    } else if (progressBar >= 100) {
      removeLabels();
      deliveredLabel.classList.add('current-status');
    }


    function removeLabels() {
      preparingLabel.classList.remove('current-status');
      shippedLabel.classList.remove('current-status');
      shippedLabel.classList.remove('current-status');
    };
};

renderTrackingPage();
updateCartQuantityHTML();
