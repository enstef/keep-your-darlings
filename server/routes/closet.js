const express = require("express")
const { isLoggedIn } = require("../middlewares")
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const Item = require("../models/Item")
const Category = require("../models/Category")

const router = express.Router()

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'darling-pics',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

router.get("/items", isLoggedIn, (req, res, next) => {
  Item.find({ _owner: req.user._id })
    .then(items => {
      res.json(items)
    })
    .catch(err => next(err))
})

// TODO: change it to GET, and send some req.query
router.post("/items", isLoggedIn, (req, res, next) => {
  console.log(req.body)
  let search_params
  search_params = { $text: {$search: req.body.textsearch }}

  // if (!req.body.textsearch) {
  // search_params = {
    // $and: [
      //  $text: { $search: req.body.textsearch }
      // {
      //   $and: [
      //     { $cond: { if: (_category), then: { _category: req.body._category}, else: {}}}
      //     // { _category: req.body._category },
      //     // { subcategory: req.body.subcategory },
          // { season: req.body.season },
          // { color: req.body.color },
          // { brand: req.body.brand }
        // ]
      // }
    // ]
  // }
  // }
  // else {
  //   search_params = {
  //     $and: [
  //       { $text: { $search: req.body.textsearch } },
  //       {
  //         $and: [
  //           { _category: req.body._category },
  //           { subcategory: req.body.subcategory },
  //           { season: req.body.season },
  //           { color: req.body.color },
  //           { brand: req.body.brand }
  //         ]
  //       }
  //     ]
  //   }
  // }

  Item.find(search_params).then(items => {
        res.json(items)
      })
})

router.post('/items', isLoggedIn, parser.single('picture'), (req, res, next) => {
  let _owner = req.user._id
  let pictureUrl = req.file.secure_url
  let { _category, subcategory, season, color, tags, brand, boughtOn, price, wornOn } = req.body
  Item.create({ _category, subcategory, season, color, tags, brand, boughtOn, price, wornOn, _owner, pictureUrl })
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
});

router.get("/items/:_id", isLoggedIn, (req, res, next) => {
  Item.findOne({ _id: req.params._id })
    .then(item => {
      res.json(item)
    })
    .catch(err => next(err))
})

router.delete("/items/:_id", isLoggedIn, (req, res, next) => {
  Item.findOneAndRemove({ _id: req.params._id })
  res.json({ message: "Item removed" })
})

router.get('/categories', (req, res, next) => {
  Category.find()
    .then(categories => {
      res.json(categories);
    })
    .catch(err => next(err))
});

module.exports = router