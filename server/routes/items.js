const express = require('express');
const Item = require('../models/Item')

const router = express.Router();

router.get('/', (req, res, next) => {
  Item.find()
    .then(items => {
      res.json(items);
    })
    .catch(err => next(err))
});

router.post('/', (req, res, next) => {
  let { } = req.body
  Item.create({  })
    .then(item => {
      res.json({
        success: true,
        item
      });
    })
    .catch(err => next(err))
});

module.exports = router;
