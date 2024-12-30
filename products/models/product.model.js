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
    product_cost: String,
    product_expiry_date: Date,
    product_pictures: [{ type: String }],
    featured: { type: String, default: 'no' },
    approved: { type: String, default: 'no' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Favourite" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
} 
