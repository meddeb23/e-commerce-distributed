import CartItem from "./CartItem";
import OrderItem from "./OrderItem";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export default class Order {
  constructor(
    public id: number,
    public userId: number,
    public total: number,
    public items: OrderItem[] = [],
    public date: Date = new Date(),
    public status: OrderStatus = OrderStatus.PENDING
  ) {}
  addItem(cartItem: CartItem) {
    const orderItem = new OrderItem(
      cartItem.product.name,
      cartItem.product.getPrice(),
      cartItem.quantity
    );
    this.items.push(orderItem);
    this.setTotal();
    return orderItem;
  }

  private setTotal() {
    this.total = this.items.reduce((acc: number, { price, quantity }) => {
      return acc + price * quantity;
    }, 0);
  }
}
