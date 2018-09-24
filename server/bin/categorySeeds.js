require('dotenv').config();
const mongoose = require("mongoose");
const Category = require("../models/Category");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/kyd", { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let categories = [
  {
    name: "Clothing",
    subcategories: ["Jackets", "Hoodies", "Coats", "Cardigans", "Pullovers", "Sweaters", "T-Shirts", "Blouses", "Dresses", "Skirts", "Overalls", "Tops", "Pants", "Jeans", "Shorts", "Blazers", "Vests"]
  },
  {
    name: "Shoes",
    subcategories: ["Sneakers", "Espadrilles", "Overknees", "Mules", "Loafers", "Boots", "Pumps", "Highheels", "Ankleboots", "Chelseaboots", "Brougues", "Sandals", "Flats", "Slippers", "Laceups", "Wedges", "Ballerinas"]
  },
  {
    name: "Special",
    subcategories: ["Swimwear", "Sportswear", "Lingerie", "Costumes", "Formalwear", "Other"]
  },
  {
    name: "accessoires",
    subcategories: ["Necklacees", "Rings", "Umbrellas", "Ties", "Hats", "Sunglasses", "Watches", "Gloves", "Scarves", "Belts", "Jewelry", "Bracelets"]
  },
  {
    name: "Bags",
    subcategories: ["Fannypacks", "Totes", "Messengers", "Backpacks", "Satchels", "Bucketbags", "Clutches", "Duffelbags", "Shoulderbags", "Weekenders", "Handbags", "Laptopbags", "Beachbags"]
  }
]

Category.create(categories)
  .then(categoriesCreated => {
    console.log(`${categoriesCreated.length} categories created`);
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

