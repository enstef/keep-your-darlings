const express = require("express")
const { isLoggedIn } = require("../middlewares")
const router = express.Router()

router.get("/ootd", isLoggedIn, (req, res, next) => {
  Item.find({
    _owner: req.user._id,
    // wornOn: [new Date().toISOString().slice(0, 10)]
    // wornOn: [new Date().toLocaleDateString()]
  })
    .then(items => {
      res.json(items)
    })
    // .then(function (Date) {
    //   this.wornOn.push(new Date())
    // })
    .catch(err => next(err))
})

router.post("/ootd", isLoggedIn, (req, res, next) => {
  Item.findManyAndUpdate({
    _id: req.params._id,
    wornOn: [Date]
  },
    {
      $addToSet:
        { wornOn: req.body.date }
    },
    { new: true }
  ).then(item => {
    res.json(item)
  })
})

module.exports = router
