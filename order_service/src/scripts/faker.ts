import { CartsRepository, OrdersRepository } from "../orders/repositories";

function getRandomNumber(max: number, min: number = 1) {
  const randomValue = Math.random() * (max - min) + min;
  return Math.floor(randomValue);
}

export default async function faker(
  repo: OrdersRepository,
  cartRepo: CartsRepository
) {
  async function insertWithRetry(u: number) {
    const cart = await cartRepo.getUserCart(u);
    if (!cart || !cart.items.length) {
      console.log(`❌ user(${u}) cart is empty or no found`);
      setTimeout(() => insertWithRetry(u), 10000);
    } else {
      await repo.create(cart);
      console.log(`✅ Order created for user(${u})`);
    }
  }
  const userIds = [
    1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  for (const u of userIds) {
    await insertWithRetry(u);
  }
}
