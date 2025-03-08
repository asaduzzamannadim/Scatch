const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
   name: String,
   price: Number,
   discount: {type:Number, default: 0},
   image: Buffer,
   brand: String
});

const product = mongoose.model('product', productSchema);

module.exports = product;