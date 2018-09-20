const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tags: [String],
  _category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  season: [String],
  color: [String],
  bougthOn: Date,
  price: Number,
  wornOn: [Date],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  }
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item

// colors:
//     chartreuse: boolean,
//     black: boolean,
//     grey: boolean,
//     white: boolean,
//     creme: boolean,
//     beige: boolean,
//     brown: boolean,
//     red: boolean,
//     bordeaux: boolean,
//     coral: boolean,
//     pink: boolean,
//     rose: boolean,
//     purple: boolean,
//     orange: boolean,
//     yellow: boolean,
//     mustard: boolean,
//     green: boolean,
//     khaki: boolean,
//     mint: boolean,
//     blue: boolean,
//     lightblue: boolean,
//     darkblue: boolean,
//     turqouise: boolean,
//     mixed: boolean,
//     silver: boolean,
//     copper: boolean,
//     gold: boolean,