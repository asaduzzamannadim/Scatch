const express = require('express')
const router = express.Router()
const isLogin = require("../middleware/isLogin")
const userModel = require("../models/user-model")

router.get('/', (req, res) => {
  res.render("add")
})

router.get('/cart', isLogin, async (req, res) => {
  let user = await userModel.findOne({email: req.user.email}).populate("cart")
  let carts = user.cart;
  res.render("cart", {carts})
})

router.get('/cart/:id', isLogin, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email })
    user.cart.push(req.params.id)
    await user.save()
    req.flash("added", "Added to Cart.")
    res.redirect("/")
  } catch (error) {
    res.send("Something went worng please try again laiter.")
  }
})

router.get('/logout', (req, res) => {
  res.cookie("token", "")
  res.redirect("/authentication")
})

module.exports = router;