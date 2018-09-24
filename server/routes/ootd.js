const express = require("express")
const { isLoggedIn } = require("../middlewares")
const router = express.Router()

router.get("/ootd", isLoggedIn, (req, res, next) => {
  Item.find({
    _owner: req.user._id,
    wornOn: [new Date().toISOString().slice(0, 10)]
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

router.get("/ootd/addOutfit", isLoggedIn, (req, res, next) => {
  Item.find({ _owner: req.user._id })
    .then(items => {
      res.json(items)
    })
    .catch(err => next(err))
})

router.post('/ootd/addOutfit', isLoggedIn, parser.single('picture'), (req, res, next) => {
  let _owner = req.user._id
  let pictureUrl = req.file.secure_url
  let { _category, subcategory, season, color, tags, brand, boughtOn, price } = req.body
  Item.create({ _category, subcategory, season, color, tags, brand, boughtOn, price, _owner, pictureUrl })
    .then(item => {
      res.json({
        success: true,
        item
      });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      })
    })
})

module.exports = router
