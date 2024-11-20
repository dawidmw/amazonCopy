import { cart } from "../../data/cart-class.js";


describe('test suite: addToCart', () => {

  it('adds an already in-cart product to the cart', () => {
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    cart.cartItems = [];
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
  });
});


describe('test suite: deleteProductFromCart', () => {
  beforeEach(() => {
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  });

  it('removes a product from the cart', () => {  
      cart.deleteProductFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.cartItems.length).toEqual(0);
    });

  it('removes product that is not in the cart', () => {
      cart.deleteProductFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
      expect(cart.cartItems.length).toEqual(1);
  });
});


describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  });

  it('updates the delivery option of a product in the cart', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
  });

  it('does nothing when updating the delivery option of a product NOT in the cart', () => {
    cart.updateDeliveryOption('dd82ca78-a18b-4e2a-9250-31e67412f98d', '3');
    expect(cart.cartItems.length).toEqual(1);
  })

  it('does nothing when given a deliveryOptionId that does NOT exist', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '4');
    expect(cart.cartItems.length).toEqual(1);
  });
});
