export default class Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  categoryName: string;

  constructor(
    id: number,
    name: string,
    price: number,
    categoryName: string,
    discount: number = null
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryName = categoryName;
    this.discount = discount;
  }

  getPrice(): number {
    if (!this.discount) return this.price;
    return this.price - (this.price * this.discount) / 100;
  }
}
