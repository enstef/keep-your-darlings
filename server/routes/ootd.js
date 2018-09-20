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
