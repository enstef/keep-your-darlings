require('dotenv').config();
const mongoose = require("mongoose");
const Category = require("../models/Category");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/keep-your-darlings", {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let categories = [
  {
    name: "clothing",
    subcategories: ["jacket", "coat", "cardigan", "pullover","sweater", "t-shirt", "blouse", "dress", "skirt", "overall", "shirttop", "pants", "jeans", "shorts",  ]
  },
  {
    name: "shoes",
    subcategories: ["sneakers", "espandrilles", "kneehighboots", "mules", "loafers", "boots", "pumps", "highheels", "ankleboots", "chelseaboots", "brougues", "sandals", "flats", "slippers", "laceups", "wedges", "ballerinas"]
  },
  {
    name: "special",
    subcategories: ["swimwear", "sportswear", "lingerie", "costumes", "formalwear", "other"]
  },
  {
    name: "accessoires",
    subcategories: ["necklace", "ring", "hat", "sunglasses", "watch", "gloves", "scarf", "belt", "jewelry", "bracelet"]
  },
  {
    name: "bags",
    subcategories: ["fannypack", "tote", "messenger", "backpack", "satchel", "bucketbag", "clutch", "duffelbag", "shoulderbag", "weekender", "handbag", "laptopbag", "beachbag", "drawstringbag"]
  }
]



/*
let categories = [
  {
    name: "clothing",
    subcategories: ["jacket", "coat", "cardigan", "pullover","sweater", "t-shirt", "blouse", "dress", "skirt", "overall", "shirttop", "pants", "jeans", "shorts",  ]
  },
  {
    name: "shoes",
    subcategories: ["sneakers", "espandrilles", "kneehighboots", "mules", "loafers", "boots", "pumps", "highheels", "ankleboots", "chelseaboots", "brougues", "sandals", "flats", "slippers", "laceups", "wedges", "ballerinas"]
  },
  {
    name: "special",
    subcategories: ["swimwear", "sportswear", "lingerie", "costumes", "formalwear", "other"]
  }
]
*/



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

