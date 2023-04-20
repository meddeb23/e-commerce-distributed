import { Cart, Order, OrderStatus } from "../entities";

export default class OrdersRepository {
  private orders: Order[] = [];

  async create(cart: Cart): Promise<Order> {
    const orderId = this.orders.length + 1;
    const order = new Order(orderId, cart.userId, cart.getCartsubTotal());
    cart.items.forEach((v) => order.addItem(v));
    this.orders.push(order);
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return this.orders;
  }

  async getById(orderId: number): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === orderId);
    return order || null;
  }

  async getByUserId(userId: number): Promise<Order[]> {
    const orders = this.orders.filter((o) => o.userId === userId);
    return orders;
  }

  async updateById(orderId: number, order: Order): Promise<boolean> {
    const index = this.orders.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      this.orders[index] = order;
      return true;
    } else {
      return false;
    }
  }

  async deleteById(orderId: number): Promise<boolean> {
    const index = this.orders.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      const order = this.orders[index];
      if (order.status === OrderStatus.PENDING) {
        this.orders[index].status = OrderStatus.CANCELLED;
        return true;
      }
      return false; // Order status is not PENDING, so cannot be deleted
    }
    return false;
  }
}
