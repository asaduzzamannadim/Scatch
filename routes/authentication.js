const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/authController');
const isLogin = require("../middleware/isLogin")
const isLogout = require("../middleware/isLogout");

router.get("/", isLogout, (req, res) => {
  let error = req.flash("error")
  res.render("authentication", {error})
})

router.post("/register", registerUser )

router.post("/login", loginUser)

router.get("/logout", (req, res) => { 
  res.cookie("token", "")
    res.redirect("/")
 })

// router.get("/login", isLogin, (req, res) => {
//   res.redirect("/")
// })

module.exports = router;