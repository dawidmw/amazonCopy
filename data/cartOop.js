/*
import { deliveryOptions } from "./deliveryOptions.js";

function Cart(localStorageKey) {
  const cart = {

    cartItems: undefined,
  
  
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if (!this.cartItems) {
        this.cartItems = [
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
    },
  
  
    saveCartToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    
    addToCart(productId) {
      let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId){
          matchingItem = cartItem;
        }
      });
  
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
  
      this.saveCartToStorage();
    },
  
  
    deleteProductFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      })
    
      this.cartItems = newCart;
    
      this.saveCartToStorage();
    },
  
  
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      let deliveryIDs = [];
    
      for (let i = 0; i < deliveryOptions.length; i++) {
        deliveryIDs.push(deliveryOptions[i].id);
      }
    
      if (!deliveryIDs.includes(deliveryOptionId)) {
        return;
      }
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId){
          matchingItem = cartItem;
          matchingItem.deliveryOptionId = deliveryOptionId;
    
          this.saveCartToStorage()
        } else {
          return;
        }
      });
    },
  
  
    calculateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    },
  
  
    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newQuantity;
        }
      });
      
      this.saveCartToStorage();
    },
  
  };

  return cart;
};


const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);
*/
