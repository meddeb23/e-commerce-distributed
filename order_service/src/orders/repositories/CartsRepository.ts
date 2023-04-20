import apiRequestHandler from "../../config/apiRequestHandler";
import { Cart, CartItem, Product } from "../entities";

const BASE_URL = "/cart-service/1.0.0";

export default class CartsRepository {
  async getUserCart(userId: number): Promise<Cart> {
    const [data, error] = await apiRequestHandler({
      url: BASE_URL + "/cart",
      method: "GET",
      data: { userId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (error) {
      console.log(error);
      return null;
    }
    if (data.status !== 200) {
      console.log(data.data.message);
      return null;
    }

    const { cart } = data.data;
    const res = new Cart(cart.id, cart.userId, cart.createdAt, cart.updatedAt);
    cart.items.forEach((v: any) => {
      const product = new Product(
        v.product.id,
        v.product.name,
        v.product.price,
        v.product.categoryId,
        v.product.discount
      );
      res.addItem(new CartItem(v.id, v.cartId, product, v.quantity));
    });
    return res;
  }
  async emptyCart(userId: number): Promise<boolean> {
    const [data, error] = await apiRequestHandler({
      url: BASE_URL + "/cart",
      method: "DELETE",
      data: { userId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (error) {
      console.log(error);
      return false;
    }
    if (data.status !== 200) {
      console.log(data);
      return false;
    }

    return true;
  }
}
