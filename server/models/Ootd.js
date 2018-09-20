const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ootdSchema = new Schema({
  date: {
    type: date,
    required: true
  },
  _items: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    }
  ],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  }
})

const Ootd = mongoose.model("Ootd", ootdSchema)

module.exports = Ootd