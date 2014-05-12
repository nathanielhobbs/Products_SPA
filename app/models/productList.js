// app/models/productList.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({ //Note: MongoDB will automatically generate an _id for each Product
    name: String,
    description: { type: String, default: "n/a"},
    price: { type: String, default: "n/a" },
    imagePath: { type: String, default: "http://eb.sk/wp-content/themes/TechNews/images/img_not_available.png" }
});

var ProductListSchema   = new Schema({
    products: [ProductSchema]
});

module.exports = mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('ProductList', ProductListSchema);
