const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemSchema = new Schema({
  _category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  subcategory: String,
  season: String,
  color: String,
  tags: String,
  brand: String,
  boughtOn: Date,
  price: Number,
  wornOn: [{
    type: String,
    validate: {
      validator: (v) => {
        return (new Date(v)).toString() !== "Invalid Date"
          && v.length === 10
          && v[4] === "-"
          && v[7] === "-"
      },
      message: "Invalid Date, should be like 'YYYY-MM-DD'"
    }
  }],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  pictureUrl: String,
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item