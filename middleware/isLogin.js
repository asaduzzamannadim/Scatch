var jwt = require('jsonwebtoken');
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("Log in now to enjoy your personalized experience!");
        res.redirect("/authentication")
    }

   try {
    var decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel.findOne({email: decoded.email}).select("-password");
     req.user = user;
     next();
   } catch (error) {
    req.flash("error", "Error. Something went wrong!");
    res.redirect("/authentication");
   }
}
