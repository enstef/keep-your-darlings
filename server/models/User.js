const mongoose = require("mongoose")
const Schema = mongoose.Schema

const validateEmail(email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}
const validatePassword(password) => {
  if (password.length >= 8) password
}

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please use a valid email address."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email address."
    ]
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    validate: [validatePassword, "Your password must have at least 8 characters."]
  },
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  bio: String,
})

const User = mongoose.model("User", userSchema)
module.exports = User
