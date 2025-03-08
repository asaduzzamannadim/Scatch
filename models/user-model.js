const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   name: String,
   email: String,
   password: String,
   cart: [
    {
        type: Schema.Types.ObjectId,
        ref: "product"
    }
   ],
   orders: [
    {
        type: Schema.Types.ObjectId,
        ref: "product"
    }
   ],
   contact: Number,
   picture: String
   
});

const user = mongoose.model('user', userSchema);

module.exports = user;