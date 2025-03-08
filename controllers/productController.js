const productModel = require("../models/product-model")

module.exports.addProduct = async (req, res) => {
    let { name, brand, price, discount } = req.body;
    try {
        let product = await productModel.create({ name, brand, image: req.file.buffer, price, discount })

        req.flash("adminSucess", "Procuct Created Sucessfully.");
        res.redirect("/admin/add")
    } catch (error) {
        req.flash("adminError", "Something Went Wrong!")
    }
}