import CartItem from "./CartItem";

export default class Cart {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[] = [];

  constructor(id: number, userId: number, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  addItem(item: CartItem) {
    this.items.push(item);
  }
  removeItem(itemId: number) {
    this.items = this.items.filter((i) => i.id !== itemId);
  }
  // get total without counting tax nor discount
  getCartsubTotal(): number {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.quantity * item.product.getPrice();
    });
    return sum;
  }
  hasItem(cartItemId: number): boolean {
    return !!this.items.find((i) => i.id === cartItemId);
  }
}
