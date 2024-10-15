var { mongoose } = require("../../config/database");

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = {
    Cart
}
