import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cartNew.js";
// import '../data/backend-practice.js';


async function loadPage() {
  try {
    Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])
    .then(() => {
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
    // const value = await new Promise((resolve) => {
    //   loadCartFetch(() => {
    //     resolve();
    //   });
    // });
  } catch(error) {
    console.log('Unexpected error. Please try again later.');
  }
};
loadPage();



// FIRST EXAMPLE
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

});
*/

// SECOND EXAMPLE
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

});
*/

// THIRD EXAMPLE
/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
