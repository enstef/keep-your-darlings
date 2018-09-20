const express = require('express');
const Item = require('../models/Item')

const router = express.Router();

router.get('/', (req, res, next) => {
  Items.find()
    .then(items => {
      res.json(items);
    })
    .catch(err => next(err))
});

router.post('/', (req, res, next) => {
  let { name, tags, category, color, boughtOn, price, wornOn } = req.body
  Item.create({ name, tags, category, color, boughtOn, price, wornOn })
    .then(item => {
      res.json({
        success: true,
        item
      });
    })
    .catch(err => next(err))
});

module.exports = router;
