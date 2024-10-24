var { mongoose } = require("../../config/database");

const itemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: {
        type: String,
        default: 0
    },
    price: {
        type: String,
        default: 0
    },
    total: {
        type: String,
        default: 0
    }
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [itemSchema], // order items list
    orderStatus: {
        type: String,
        default: 'pending'
    }, // pending, shipped, delivered

    tax: {
        type: Number,
        default: 0
    },

    subtotal: {
        type: Number,
        default: 0
    },

    shippingCost: {
        type: Number,
        default: 0
    },

    total: {
        type: Number,
        default: 0
    }, // including tax and shipping
    
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Order
}
