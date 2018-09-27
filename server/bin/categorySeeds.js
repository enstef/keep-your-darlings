require('dotenv').config();
const mongoose = require("mongoose");
const Category = require("../models/Category");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/keep-your-darlings", { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let categories = [
  {
    name: "Clothing",
    subcategories: ["Pants", "Jeans", "Shorts", "Tops", "T-Shirts", "Blouses", "Pullovers", "Sweaters", "Hoodies", "Cardigans", "Blazers", "Vests", "Jackets", "Coats", "Dresses", "Skirts", "Overalls", "Pyjamas"]
  },
  {
    name: "Shoes",
    subcategories: ["Sneakers", "Boots", "Ankleboots", "Chelseaboots", "Overknees", "Loafers", "Brougues", "Flats", "Espadrilles", "Ballerinas", "Sandals", "Slippers", "Pumps", "Highheels", "Wedges",]
  },
  {
    name: "Special",
    subcategories: ["Swimwear", "Sportswear", "Lingerie", "Costumes", "Formalwear", "Other"]
  },
  {
    name: "Accessories",
    subcategories: ["Necklacees", "Rings", "Bracelets", "Earrings", "Watches", "Sunglasses", "Ties", "Scarves", "Hats", "Gloves", "Belts", "Other"]
  },
  {
    name: "Bags",
    subcategories: ["Backpacks", "Fannypacks", "Messengers", "Totes", "Satchels", "Bucketbags", "Clutches", "Duffelbags", "Handbags", "Shoulderbags", "Weekenders", "Laptopbags", "Beachbags"]
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

