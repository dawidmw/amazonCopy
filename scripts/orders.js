import { updateCartQuantityHTML } from "./utils/cartIconQuantity.js"; 
import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { cart } from "../data/cartNew.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


await loadProductsFetch();


function renderListOfOrders() {
  let ordersHTML = '';

  orders.forEach((order) => {
    const orderDateFormated = dayjs(order['orderTime']).format('DD MMM YYYY, H:m');
    
    ordersHTML += 
      `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDateFormated}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order['totalCostCents'])}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order['id']}</div>
            </div>
          </div>


          <div class="order-details-grid">
            ${renderOrderDetailsGrid(order)}
          </div>

        </div>
      `;
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
};


function renderOrderDetailsGrid(order) {
  let productsInOrderHTML = '';
  let productsList = order['products'];

  productsList.forEach((product) => {
    const fullProductInfo = getProduct(product['productId']);
    const productDeliveryTime = dayjs(product['estimatedDeliveryTime']).format('DD MMM YYYY');

    productsInOrderHTML +=
      `
        <div class="product-image-container"> 
          <img src="${fullProductInfo['image']}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${fullProductInfo['name']}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${productDeliveryTime}
          </div>
          <div class="product-quantity">
            Quantity: ${product['quantity']}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${fullProductInfo['id']}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order['id']}&productId=${fullProductInfo['id']}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
  });

  return productsInOrderHTML;
};

renderListOfOrders();
updateCartQuantityHTML();

document.querySelectorAll('.js-buy-again-button').forEach((buttonElem) => {
  buttonElem.addEventListener('click', () => {
    const productId = buttonElem.dataset.productId;
    cart.addToCart(productId);
    updateCartQuantityHTML();
  });
});
