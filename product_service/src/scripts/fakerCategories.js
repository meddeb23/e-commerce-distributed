const db = require("../models");

const productCategories = [
  {
    name: 'Apparel',
    desc: 'Clothing and accessories for men, women, and children, including shirts, pants, dresses, hats, and shoes.'
  },
  {
    name: 'Electronics',
    desc: 'Electronic devices and accessories, such as smartphones, laptops, televisions, headphones, and chargers.'
  },
  {
    name: 'Home & Kitchen',
    desc: 'Furniture, appliances, and kitchenware, including sofas, chairs, tables, refrigerators, ovens, and cookware.'
  },
  {
    name: 'Beauty & Personal Care',
    desc: 'Personal care products, such as skincare, haircare, makeup, and fragrance products.'
  },
  {
    name: 'Sports & Outdoors',
    desc: 'Equipment and accessories for sports and outdoor activities, including bicycles, camping gear, athletic shoes, and fitness trackers.'
  },
  {
    name: 'Toys & Games',
    desc: 'Games, toys, and puzzles for children and adults, including board games, puzzles, action figures, and dolls.'
  },
  {
    name: 'Books & Media',
    desc: 'Books, music, movies, and other media, including novels, biographies, music albums, and movies.'
  },
  {
    name: 'Food & Beverages',
    desc: 'Food and beverage products, including snacks, candy, coffee, tea, and alcoholic and non-alcoholic beverages.'
  },
  {
    name: 'Pet Supplies',
    desc: 'Supplies for pets, including food, toys, grooming products, and litter boxes.'
  },
  {
    name: 'Automotive',
    desc: 'Automotive parts and accessories, such as tires, brakes, oil filters, and car covers.'
  }
];


async function faker() {
  for (const i of productCategories) {
    try {
      const data = await db.category.create(i)
      console.log(`category created: ${i.name}`)

    } catch (err) {
      console.log(err.message || "Some error occurred while creating Category .")
    }
  }
}
module.exports = faker
