const mongoose = require('mongoose');
const { Schema } = mongoose;

const ownerSchema = new Schema({
   name: String,
   email: String,
   password: String,
   products: [
    {
        type: Schema.Types.ObjectId,
        ref: "product-model"
    }
   ],
   picture: String,
   gstin: String
   
});

const owner = mongoose.model('owner', ownerSchema);

module.exports = owner;