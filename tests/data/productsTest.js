import { Product, Clothing, products, loadProductsFetch } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js"


describe('test suite: Product Class', () => {
  let product;

  beforeAll(async () => {
    await loadProductsFetch();
  });

  beforeEach(() => {
    product = new Product(products[1]);
  });
  
  it('receives a proper id', () => {
    expect(product.id).toEqual(product['id']);
  });

  it('receives a proper name', () => {
    expect(product.name).toEqual(product['name']);
  });

  it('gets a correct number of stars shown', () => {
    const stars = product.getStarsUrl();
    expect(stars).toContain(product['rating']['stars'] * 10);
  });

  it('shows a correct product price', () => {
    const price = product.getPrice();
    expect(price).toEqual(`$${formatCurrency(product['priceCents'])}`);
  });

  it('does nothing when called for extraInfo', () => {
    expect(product.extraInfoHTML()).toEqual('');
  });

});

describe('test suite: Clothing Class', () => {
  let clothing;
  beforeEach(() => {
    clothing = new Clothing(products[2]);
  });
  it('has a chart link', () => {
    expect(clothing.sizeChartLink).toEqual(products[2]['sizeChartLink'])
  });

  it('generates html code properly when called extraInfoHTML', () => {
    expect(clothing.extraInfoHTML()).toContain(
      `<a href="${clothing.sizeChartLink}" target="_blank">`)
  });
})
