import { Cart, CartItem, Product } from "../entities";

export default class CartRepository {
  cart: Cart = new Cart(5, 1, new Date(), new Date());

  async createCart(userId: number) {}
  async getCart(userId: number): Promise<Cart> {
    return this.cart;
  }
  async emptyCart(userId: number) {
    return new Cart(5, 1, new Date(), new Date());
  }

  async addItemToCart(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<CartItem> {
    const newProduct = new Product(1, "Product Name", 10.99, 1);
    const item = new CartItem(1, this.cart.id, newProduct, 5);
    this.cart.addItem(item);
    return item;
  }
  async removeItemFromCart(cartItemId: number) {
    this.cart.removeItem(cartItemId);
    return this.cart;
  }
  async updatecartItem(cartItemId: number, quantity: number) {}

  async getTax() {}
  // get the total of discounted value in a cart
  async getDiscount(userId: number) {}

  async verifyCoupon(couponText: string) {}

  // discount percentage
  async getCouponValue(couponText: string) {}

  // get amout to pay
  async getCartTotal(userId: number) {}
}
