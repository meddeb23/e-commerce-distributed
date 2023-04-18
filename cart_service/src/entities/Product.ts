export default class Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  categoryId: number;

  constructor(
    id: number,
    name: string,
    price: number,
    categoryId: number,
    discount: number = null
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.discount = discount;
  }

  getPrice(): number {
    if (!this.discount) return this.price;
    return this.price - (this.price * this.discount) / 100;
  }
}
