import { httpResponse, makeHttpError, makeHttpResponse } from "../helper";
import { httpRequest } from "../helper/adapt-request";
import { CartsRepository, OrdersRepository } from "./repositories";
import ReqValidation from "./utilities";

export interface IOrdersService {
  createOrder(req: httpRequest): Promise<httpResponse>;
  cancelOrder(req: httpRequest): Promise<httpResponse>;
  getOrder(req: httpRequest): Promise<httpResponse>;
  getUserOrders(req: httpRequest): Promise<httpResponse>;
  getAllOrders(req: httpRequest): Promise<httpResponse>;
  updateOrder(req: httpRequest): Promise<httpResponse>;
  deleteOrder(req: httpRequest): Promise<httpResponse>;
}

class OrdersService implements IOrdersService {
  ordersRepository: OrdersRepository;
  cartsRepository: CartsRepository;

  constructor(
    ordersRepository: OrdersRepository,
    cartsRepository: CartsRepository
  ) {
    this.ordersRepository = ordersRepository;
    this.cartsRepository = cartsRepository;
  }

  async createOrder(req: httpRequest): Promise<httpResponse> {
    const userId = parseInt(req.body.userId);

    const { error } = ReqValidation.idSchema.validate(userId);
    if (error) return makeHttpError(400, error.message);

    const cart = await this.cartsRepository.getUserCart(userId);
    if (!cart) return makeHttpError(404, "cart does not exsit");
    if (!cart.items.length) return makeHttpError(400, "Empty cart");

    const order = await this.ordersRepository.create(cart);
    if (!order)
      return makeHttpError(
        500,
        "Can't precced orders for the moment please try later"
      );
    this.cartsRepository
      .emptyCart(userId)
      .then((d) => d || console.log("cart not deleted"));

    return makeHttpResponse(200, order);
  }

  async cancelOrder(req: httpRequest): Promise<httpResponse> {
    const orderId = parseInt(req.pathParams.orderId);

    const { error } = ReqValidation.idSchema.validate(orderId);
    if (error) return makeHttpError(400, error.message);

    const order = await this.ordersRepository.getById(orderId);
    if (!order) return makeHttpError(404, "Order not found");

    const success = await this.ordersRepository.deleteById(orderId);
    if (!success) return makeHttpError(500, "Failed to delete order");

    return makeHttpResponse(200, { message: "Order canceled successfully" });
  }

  async getOrder(req: httpRequest): Promise<httpResponse> {
    const orderId = parseInt(req.pathParams.orderId);

    const { error } = ReqValidation.idSchema.validate(orderId);
    if (error) return makeHttpError(400, error.message);

    const order = await this.ordersRepository.getById(orderId);
    if (!order) return makeHttpError(404, "Order not found");

    return makeHttpResponse(200, order);
  }

  async getUserOrders(req: httpRequest): Promise<httpResponse> {
    const userId = parseInt(req.body.userId);

    const { error } = ReqValidation.idSchema.validate(userId);
    if (error) return makeHttpError(400, error.message);

    const userOrders = this.ordersRepository.getByUserId(userId);

    return makeHttpResponse(200, userOrders);
  }

  async getAllOrders(req: httpRequest): Promise<httpResponse> {
    const orders = await this.ordersRepository.getOrders();

    return makeHttpResponse(200, { orders });
  }

  async updateOrder(req: httpRequest): Promise<httpResponse> {
    return makeHttpResponse(200, { message: "updateOrder not implemented" });
  }

  async deleteOrder(req: httpRequest): Promise<httpResponse> {
    return makeHttpResponse(200, { message: "deleteOrder not implemented" });
  }
}

export default OrdersService;
