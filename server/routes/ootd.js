// const express = require("express")
// const { isLoggedIn } = require("../middlewares")
// const router = express.Router()


// router.get("/ootd", isLoggedIn, (req, res, next) => {
//   Item.find({
//     _owner: req.user._id,
//     wornOn: [new Date().toISOString().slice(0, 10)]
//     // wornOn: [new Date().toLocaleDateString()]
//   })
//     .then(items => {
//       res.json(items)
//     })
//     // .then(function (Date) {
//     //   this.wornOn.push(new Date())
//     // })
//     .catch(err => next(err))
// })

// router.post('/', isLoggedIn, (req, res, next) => {
//   let _owner = req.user._id
//   let items = [];
//   req.body.map(item => items.push(item._id))
//   let wornOn = new Date();

//   Outfit.create({ _owner, items, wornOn })
//     .then(ootd => {
//       res.json({
//         success: true,
//         ootd
//       });
//     })
//     .catch(err => {
//       res.json({
//         success: false,
//         error: err
//       });
//     })
// })

// router.patch("/", isLoggedIn, (req, res, next) => {

// })

// // 
// // router.patch("/", isLoggedIn, (req, res, next) => {
// //   console.log(req.body)
// //   req.body.map(item => {
// //     Item.findById(item._id)
// //       .then(item => {
// //         item.wornOn.push(new Date())
// //
// // {
// //     $addToSet:
// //       { wornOn: req.body.date }
// //   },
// //   { new: true }
// //         item.save()
// //          res.json({
// //           success: true,
// //            wornOn
// //         })
// //       })
// //       .catch(err => {
// //         res.json({
// //           success: false,
// //           error: err
// //         })
// //       })
// // })

// // Item.findManyAndUpdate({
// //   _id: req.params._id,
// //   wornOn: [Date]
// // },
// //   
// // ).then(item => {
// //   res.json(item)
// // })

// router.get("/ootd/addOutfit", isLoggedIn, (req, res, next) => {
//   Item.find({ _owner: req.user._id })
//     .then(items => {
//       res.json(items)
//     })
//     .catch(err => next(err))
// })

// module.exports = router