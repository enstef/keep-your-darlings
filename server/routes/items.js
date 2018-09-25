const express = require("express")
const { isLoggedIn } = require("../middlewares")
const router = express.Router()
const Item = require("../models/Item")


router.post("/:itemId/wornOn", isLoggedIn, (req, res, next) => {
  Item.findByIdAndUpdate(req.params.itemId, { $push: { wornOn: req.body.date } }, { new: true })
    .then(newItem => {
      res.json({
        success: true,
        item: newItem
      })
    })
})


module.exports = router