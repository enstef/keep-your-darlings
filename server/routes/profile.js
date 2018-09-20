const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../middlewares")

const Item = require("../models/Item")

router.get("/", isLoggedIn, (req, res, next) => {
  res.json(req.user)
})

router.get("/closet", isLoggedIn, (req, res, next) => {
  Item.find({_owner: req.user._id})
  .then(items => {
    res.json(items)
  })
  .catch(err => next(err))
})

router.post('/closet/add-item', isLoggedIn, (req, res, next) => {
  let _owner = req.user._id
  let { name, tags, _category, color, boughtOn, price, wornOn } = req.body
  Item.create({ name, tags, _category, color, boughtOn, price, wornOn, _owner })
    .then(item => {
      res.json({
        success: true,
        item
      });
    })
    .catch(err => next(err))
});

router.get("/closet/item/:_id", isLoggedIn, (req, res, next) => {
  Item.findOne({_id: req.params._id})
  .then(item => {
    res.json(item)
  })
  .catch(err => next(err))
})

router.delete("/closet/item/:_id", isLoggedIn, (req, res, next) => {
  Item.findOneAndRemove({_id: req.params._id})
  res.json({message: "Item removed"})
})

// router.post("/outfit", isLoggedIn, (req, res, next) => {
//   Item.findManyAndUpdate(
//   {_id: req.params._id},
//     {$addToSet: 
//       {wornOn: req.body.date}
//     },
//     {new: true}
//   ).then(item => {
//     res.json(item)
//   })
// })

// router.get("/outfit/select", isLoggedIn, (req, res, next) => {
//   Item.find({_owner: req.user._id})
// })
// router.post("/outfit/select", isLoggedIn, (req, res, next) => {
//   Item.find({_owner: req.user._id})
// })

module.exports = router