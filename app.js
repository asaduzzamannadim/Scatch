const express = require('express')
const app = express()
const port = 3000

const db = require("./config/mongoose-conection")
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

require("dotenv").config()

const authentication = require("./routes/authentication");
const adminRouter = require("./routes/adminRouter");
const usersRouter = require("./routes/usersRouter");
const homeRouter = require("./routes/homeRouter")
var session = require('express-session');
var flash = require('connect-flash');

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(flash());
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use("/", homeRouter)
app.use("/authentication", authentication)
app.use("/admin", adminRouter);
app.use("/user", usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})