const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../middlewares")

const Item = require("../models/Item")

router.get("/"), (req, res, next) => {
 //landing redirect to profile 
}

module.exports = router