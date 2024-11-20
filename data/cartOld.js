/*
import { deliveryOptions } from "./deliveryOptions.js";

export let cart;


loadFromStorage();


export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];
  }  
};


export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveCartToStorage();
};


export function deleteProductFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })

  cart = newCart;

  saveCartToStorage();
};


export function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};


export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
};


export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  
  saveCartToStorage();
};


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  let deliveryIDs = [];

  for (let i = 0; i < deliveryOptions.length; i++) {
    deliveryIDs.push(deliveryOptions[i].id);
  }

  if (!deliveryIDs.includes(deliveryOptionId)) {
    return;
  }

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId){
      matchingItem = cartItem;
      matchingItem.deliveryOptionId = deliveryOptionId;

      saveCartToStorage()
    } else {
      return;
    }
  });
};
*/
