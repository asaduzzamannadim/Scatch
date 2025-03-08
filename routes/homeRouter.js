const express = require('express')
const router = express.Router()
const productModel = require("../models/product-model")

router.get("/", async (req, res) => { 
   let products = await productModel.find()
   let added = req.flash("added")
   let token = req.cookies.token
   res.render("shop", {products, added, token})
 })

module.exports = router;