const express = require("express")
const { isLoggedIn } = require("../middlewares")
const router = express.Router()
const Item = require("../models/Item");


router.get("/", isLoggedIn, (req, res, next) => {
  Item.find({ _owner: req.user._id })
    .then(items => {
      let history = {}
      items.map(item => {
        item.wornOn.map(date => {
          if (!Object.keys(history).includes(date)) {
            history[date] = {};
            history[date].items = [];
            history[date].items.push(item)
          } else {
            history[date].items.push(item)
          }
        })
      })
      res.json(history)
    })
    .catch(err => next(err))
})

// router.get("/", isLoggedIn, (req, res, next) => {
//   Item.find({
//     _owner: req.user._id,
//     wornOn: [new Date().toISOString().slice(0, 10)],
//     // wornOn: [new Date().toLocaleDateString()]
//   })
//     .then(items => {
//       res.json(items)
//     })
//     .catch(err => next(err))
// })

module.exports = router