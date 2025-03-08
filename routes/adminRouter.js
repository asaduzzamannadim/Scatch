const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owners-model')
const {addProduct} = require("../controllers/productController")
const upload = require("../config/multer-config")

router.get('/', (req, res) => {
  res.render("addProduct")
})

router.get('/add', (req, res) => {
  let sucess = req.flash("adminSucess")
  let error = req.flash("adminError")
  res.render("addProduct", {sucess, error})
})

router.post('/createproduct', upload.single('image'),  addProduct)

if (process.env.NODE_ENV = "development") {
    router.post('/create', async (req, res) => {
        let owner = await ownerModel.findOne()
        if (owner) {
            res.send("Owner already exsits")
        }else{
            let {name, email, password} = req.body;
        let newOwner = await ownerModel.create({name, email, password})
        res.send(newOwner)
        }  
      })
}

module.exports = router;