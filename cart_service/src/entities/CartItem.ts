import Product from "./Product";

export default class CartItem {
  id: number;
  cartId: number;
  product: Product;
  quantity: number;

  constructor(id: number, cartId: number, product: Product, quantity: number) {
    this.id = id;
    this.cartId = cartId;
    this.product = product;
    this.quantity = quantity;
  }
}
