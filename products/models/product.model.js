var { mongoose } = require("../../config/database");

const productSchema = new mongoose.Schema({
    product_name: String,
    product_picture: String,
    product_category: String,
    product_sub_category: String,
    product_description: String,
    product_price: String,
    product_quantity: String,
    product_weight: String,
    product_size: String,
    product_code: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
} 
 