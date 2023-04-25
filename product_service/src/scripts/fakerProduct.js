const db = require("../models");

const products = [
  { name: "Sony WH-1000XM4 Wireless Headphones", price: 349.99, categoryId: 2 },
  { name: "Samsung Galaxy S21 Ultra 5G", price: 1199.99, categoryId: 2 },
  { name: "Apple iPad Air (2020)", price: 599.00, categoryId: 2 },
  { name: "LG CX Series 55-Inch OLED TV", price: 1499.99, categoryId: 2 },
  { name: "DJI Mavic Air 2", price: 799.00, categoryId: 2 },
  { name: "Nikon Z7 II Mirrorless Camera", price: 2999.95, categoryId: 2 },
  { name: "Xbox Series X", price: 499.99, categoryId: 2 },
  { name: "Canon EOS R5 Mirrorless Camera", price: 3899.00, categoryId: 2 },
  { name: "ASUS ROG Swift PG279QZ Gaming Monitor", price: 699.99, categoryId: 2 },
  { name: "Beats Studio Buds True Wireless Earbuds", price: 149.99, categoryId: 2 },
  { name: "Instant Pot DUO60 6 Qt 7-in-1 Pressure Cooker", price: 79.99, categoryId: 3 },
  { name: "Ninja Foodi 5-in-1 Indoor Grill with 4-Quart Air Fryer", price: 229.99, categoryId: 3 },
  { name: "iRobot Roomba i7+ (7550) Robot Vacuum", price: 799.99, categoryId: 3 },
  { name: "Dyson Cyclone V10 Absolute Cordless Vacuum", price: 449.99, categoryId: 3 },
  { name: "Keurig K-Elite Single Serve Coffee Maker", price: 149.99, categoryId: 3 },
  { name: "Lodge Cast Iron Skillet", price: 24.97, categoryId: 3 },
  { name: "Cuisinart Chef's Classic Stainless Steel Cookware Set", price: 169.99, categoryId: 3 },
  { name: "Nespresso VertuoPlus Coffee and Espresso Maker", price: 129.00, categoryId: 3 },
  { name: "KitchenAid Artisan Series 5-Qt. Stand Mixer", price: 379.99, categoryId: 3 },
  { name: "Breville BES870XL Barista Express Espresso Machine", price: 699.95, categoryId: 3 },
  { name: "LEGO Star Wars: The Mandalorian The Razor Crest Building Kit", price: 129.99, categoryId: 6 },
  { name: "NERF Ultra One Motorized Blaster", price: 49.99, categoryId: 6 },
  { name: "Hatchimals Pixies Crystal Flyers Pink Magical Flying Pixie Toy", price: 19.99, categoryId: 6 },
  { name: "Barbie Dreamhouse Dollhouse with Pool, Slide and Elevator", price: 179.99, categoryId: 6 },
  { name: "Monopoly Classic Board Game", price: 19.99, categoryId: 6 },
  { name: "Baby Yoda Plush Toy", price: 24.99, categoryId: 6 },
  { name: "Melissa & Doug Deluxe Wooden Standing Art Easel", price: 69.99, categoryId: 6 },
  { name: "L.O.L. Surprise! O.M.G. Remix Honeylicious Fashion Doll", price: 34.99, categoryId: 6 },
  { name: "Hot Wheels Criss Cross Crash Track Set", price: 49.99, categoryId: 6 },
  { name: "Play-Doh Kitchen Creations Ultimate Swirl Ice Cream Maker Playset", price: 29.99, categoryId: 6 },
  { name: "Twinings of London English Breakfast Tea Bags", price: 6.58, categoryId: 8 },
  { name: "Kirkland Signature Colombian Supremo Whole Bean Coffee", price: 12.99, categoryId: 8 },
  { name: "Ben & Jerry's Chocolate Fudge Brownie Ice Cream", price: 4.99, categoryId: 8 },
  { name: "Pringles Original Potato Crisps", price: 1.69, categoryId: 8 },
  { name: "Bertolli Organic Traditional Tomato & Basil Sauce", price: 4.49, categoryId: 8 },
  { name: "KIND Dark Chocolate Nuts & Sea Salt Bars", price: 14.22, categoryId: 8 },
  { name: "Blue Diamond Almonds, Smokehouse", price: 5.99, categoryId: 8 },
  { name: "San Pellegrino Sparkling Mineral Water", price: 16.12, categoryId: 8 },
  { name: "Stash Tea Chai Spice Black Tea", price: 3.70, categoryId: 8 },
  { name: "Lindt Lindor Milk Chocolate Truffles", price: 4.49, categoryId: 8 },

];


async function faker() {
  for (const i of products) {
    try {
      const data = await db.product.create(i)
      console.log(`product created: ${i.name}`)

    } catch (err) {
      console.log(err.message || "Some error occurred while creating product .")
    }
  }
}
module.exports = faker