import axios from "axios";
import { Product } from "../entities";
import apiRequestHandler from "../config/apiRequestHandler";

const BASE_URL = "/product-service/1.0.0/api";

export default class ProductRepository {
  async getProduct(productId: number): Promise<Product> {
    console.log("getting the data");
    const [data, error] = await apiRequestHandler({
      url: BASE_URL + `/products/${productId}`,
      method: "GET",
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
    const product = data.data;
    const newProduct = new Product(
      product.id,
      product.name,
      product.price,
      product.category.name
    );

    return newProduct;
  }

  async getTax() {}
  // get the total of discounted value in a Product
  async getDiscount(userId: number) {}

  async verifyCoupon(couponText: string) {}

  // discount percentage
  async getCouponValue(couponText: string) {}

  // get amout to pay
  async getProductTotal(userId: number) {}
}
