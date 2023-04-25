import { Cart, CartItem, Product } from "../entities";
import ProductRepository from "./ProductRepository";

export default class CartRepository {
  cart: Cart = new Cart(5, 1, new Date(), new Date());
  prodRepo: ProductRepository = new ProductRepository();
  async createCart(userId: number) {}

  async getCart(userId: number): Promise<Cart> {
    return this.cart;
  }
  async emptyCart(userId: number) {
    this.cart.items = [];
    return this.cart;
  }

  async addItemToCart(
    userId: number,
    product: Product,
    quantity: number
  ): Promise<CartItem> {
    const idx = this.cart.items.findIndex((i) => i.product.id == product.id);
    if (idx !== -1) {
      this.cart.items[idx].quantity++;
      return this.cart.items[idx];
    }
    console.log("get the new product");
    if (!product) return null;
    const item = new CartItem(
      this.cart.items.length,
      this.cart.id,
      product,
      quantity
    );
    this.cart.addItem(item);
    return item;
  }

  async removeItemFromCart(cartItemId: number) {
    this.cart.removeItem(cartItemId);
    return this.cart;
  }

  async updatecartItem(
    cartItemId: number,
    quantity: number
  ): Promise<CartItem> {
    this.cart.items = this.cart.items.map((i) =>
      i.id == cartItemId ? { ...i, quantity } : i
    );
    return this.cart.items.find((i) => i.id == cartItemId);
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
