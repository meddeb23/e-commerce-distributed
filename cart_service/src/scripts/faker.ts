import CartRepository from "../cart/CartRepository";

function getRandomNumber(max: number, min: number = 1) {
  const randomValue = Math.random() * (max - min) + min;
  return Math.floor(randomValue);
}

export default async function faker(repo: CartRepository) {
  async function insertWithRetry(u: number) {
    const productId = getRandomNumber(40);
    const quantity = getRandomNumber(4);
    const product = await repo.prodRepo.getProduct(productId);
    if (!product) {
      console.log(`❌ user(${u}) cart not found`);
      setTimeout(() => insertWithRetry(u), 10000);
    } else {
      await repo.addItemToCart(u, product, quantity);
      console.log(`✅ product(${product.name}) created for user(${u})`);
    }
  }
  const userIds = [
    1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  for (const u of userIds) {
    const prodNum = getRandomNumber(5);
    console.log(`Number of product(${prodNum}) for user(${u})`);
    for (let i = 0; i < prodNum; i++) {
      await insertWithRetry(u);
    }
  }
}
