module.exports = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            return next();
        }
        res.redirect("/");
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Something went wrong, please try again later.");
}
}