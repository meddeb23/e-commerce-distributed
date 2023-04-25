import { Cart, CartItem, Product } from "../entities";
import ProductRepository from "./ProductRepository";

export default class CartRepository {
  carts: Cart[] = [];
  prodRepo: ProductRepository = new ProductRepository();
  async createCart(userId: number) {
    return this.carts.push(new Cart(this.carts.length + 1, userId)) - 1;
  }

  async getCart(userId: number): Promise<Cart> {
    return this.carts.find((i) => i.userId == userId);
  }
  async emptyCart(userId: number) {
    const idx = this.carts.findIndex((i) => i.userId == userId);
    this.carts[idx].items = [];
    return this.carts[idx];
  }

  getUserCartIndex(userId: number): number {
    console.log(
      this.carts.findIndex((i) => i.userId == userId),
      userId
    );
    return this.carts.findIndex((i) => i.userId == userId);
  }

  async addItemToCart(
    userId: number,
    product: Product,
    quantity: number
  ): Promise<CartItem> {
    let i = this.getUserCartIndex(userId);
    if (i === -1) i = await this.createCart(userId);
    const idx = this.carts[i].items.findIndex(
      (i) => i.product.id == product.id
    );
    if (idx !== -1) {
      this.carts[i].items[idx].quantity++;
      return this.carts[i].items[idx];
    }
    const item = new CartItem(
      this.carts[i].items.length,
      this.carts[i].id,
      product,
      quantity
    );
    this.carts[i].addItem(item);
    return item;
  }

  async removeItemFromCart(userId: number, cartItemId: number) {
    const i = this.getUserCartIndex(userId);

    this.carts[i].removeItem(cartItemId);
    return this.carts[i];
  }

  async updatecartItem(
    userId: number,
    cartItemId: number,
    quantity: number
  ): Promise<CartItem> {
    const i = this.getUserCartIndex(userId);

    this.carts[i].items = this.carts[i].items.map((i) =>
      i.id == cartItemId ? { ...i, quantity } : i
    );
    return this.carts[i].items.find((i) => i.id == cartItemId);
  }

  async getTax() {}
  // get the total of discounted value in a cart
  async getDiscount(userId: number) {}

  async verifyCoupon(couponText: string) {}

  // discount percentage
  async getCouponValue(couponText: string) {}

  // get amout to pay
  async getCartTotal(userId: number) {}
}
