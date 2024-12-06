var { mongoose } = require("../../config/database");

const cartSchema = new mongoose.Schema({
    quantity: {
        type: Number, default: 0
    },
    subtotal: {
        type: Number, default: 0
    },
    price: {
        type: Number, default: 0
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = {
    Cart
}
