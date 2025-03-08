const express = require('express');
const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
const genrateToken = require('../utils/genrateToken')
const app = express()

app.use(cookieParser())

module.exports.registerUser =  async (req, res) => {
    let { name, email, password } = req.body;
    try {
      let exUser = await userModel.findOne({ email: req.body.email })
  
      if (!exUser) {
        bcrypt.genSalt(10, async function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              console.log(err.message)
            }
            let user = await userModel.create({ name, email, password: hash })
            let token = genrateToken(user)
            res.cookie("token", token)
            res.redirect("/")
          });
        });
      } else {
        req.flash("error", "User already exists. Please login")
        res.redirect("/authentication")
      }
  
    } catch (error) {
      req.flash("Something went worng! Please try again later.")
    }
  }

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;
     let user = await userModel.findOne({email})

     if (user) {
      bcrypt.compare(password, user.password).then(function(result) {
        if (result) {
          let token = genrateToken(user);
          res.cookie("token", token);
          res.redirect("/")
        }else{
            req.flash("error", "Email or Password is incorrect")
            res.redirect("/authentication")
        }
    });
     }else{
      req.flash("error", "Email or Password is incorrect")
      res.redirect("/authentication")
     }
  }
  