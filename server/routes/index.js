const express = require("express")
const { isLoggedIn } = require("../middlewares")
const router = express.Router()

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.json({
    _id: req.user._id,
    email: req.user.email,
  })
})

module.exports = router