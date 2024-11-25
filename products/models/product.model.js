var { mongoose } = require("../../config/database");

const productSchema = new mongoose.Schema({
    product_name: String,
    product_category: String,
    product_sub_category: String,
    product_description: String,
    product_price: String,
    product_quantity: String,
    product_weight: String,
    product_size: String,
    product_code: String,
    product_demos_links: String,
    product_photos_links: String,
    product_pictures: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
}
