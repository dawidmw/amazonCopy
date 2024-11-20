import { updateCartQuantityHTML } from "./utils/cartIconQuantity.js";
import { cart } from "../data/cartNew.js";
import { products, loadProductsFetch } from "../data/products.js";


await loadProductsFetch();

function renderProductsGrid() {
  let productsHTML = '';

  const url = new URL(window.location.href);
  let searchValue = url.searchParams.get('search');
  if (searchValue) {
    searchValue = searchValue.toLowerCase();
  }

  if (!searchValue) {
    products.forEach((product) => {
      productsHTML += generateProductCotainer(product); 
    });
  } else {
    document.querySelector('.js-products-grid').innerHTML = '';
    products.forEach((product) => {
      const productNameLowerCased = product['name'].toLowerCase();
      if (productNameLowerCased.includes(searchValue) || product['keywords'].includes(searchValue)) {
        productsHTML += generateProductCotainer(product);
      }
    });
  }

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  updateCartQuantityHTML();

  document.querySelectorAll('.js-add-to-cart').forEach((buttonElem) => {
    buttonElem.addEventListener('click', () => {
      const productId = buttonElem.dataset.productId;
      cart.addToCart(productId);
      updateCartQuantityHTML();
    });
  });
};

renderProductsGrid();

const searchButton = document.querySelector('.js-search-button');
searchButton.addEventListener('click', () => {
  const searchValue = document.querySelector('.js-search-bar').value;
  if (searchValue) {
    window.location.href = `amazon.html?search=${searchValue}`; 
  } else {
    window.location.href = 'amazon.html'
  }
});


function generateProductCotainer(product) {
  const html = `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  return html;
};
