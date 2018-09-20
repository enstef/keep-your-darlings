const express = require("express")
const { isLoggedIn } = require("../middlewares")
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const Item = require("../models/Item")

const router = express.Router()

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'darling-pics',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

// router.get('/secret', isLoggedIn, (req, res, next) => {
//   res.json({
//     secret: 42,
//     user: req.user
//   });
// });
//secret page for OOTD?!


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


// //picture UPLOAD
// router.patch('/closet/add-item', isLoggedIn, parser.single('picture'), (req, res, next) => {
//   User.findByIdAndUpdate(req.user._id, {
//     pictureUrl: req.file.secure_url
//   })
//     .then(() => {
//       res.json({
//         success: true,
//         pictureUrl: req.file.secure_url
//       })
//     })
//     .catch(err => {
//       res.json({
//         success: false,
//         error: err
//       })
//     })
// })
// //



// router.post('/closet/add-item', isLoggedIn, (req, res, next) => {
//   let _owner = req.user._id
//   let { name, tags, _category, color, boughtOn, price, wornOn } = req.body
//   Item.create({ name, tags, _category, color, boughtOn, price, wornOn, _owner })
//     .then(item => {
//       res.json({
//         success: true,
//         item
//       });
//     })
//     .catch(err => next(err))
// });



router.post('/closet/add-item', isLoggedIn, parser.single('picture'),(req, res, next) => {
  let _owner = req.user._id
  let pictureUrl = req.file.secure_url
  let { name, tags, _category, color, boughtOn, price, wornOn} = req.body
  Item.create({ name, tags, _category, color, boughtOn, price, wornOn, pictureUrl, _owner })
    .then(item => {
      res.json({
        success: true,
        pictureUrl: req.file.secure_url,
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
//   Item.findOne
// }

module.exports = router