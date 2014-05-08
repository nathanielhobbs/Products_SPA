// app/models/productList.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({ //Note: MongoDB will automatically generate an _id for each Product
    name: String,
    description: String,
    price: String,
    imagePath: String
});

var ProductListSchema   = new Schema({
    products: [ProductSchema]
});

module.exports = mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('ProductList', ProductListSchema);
