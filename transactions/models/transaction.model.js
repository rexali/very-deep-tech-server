var { mongoose } = require("../../config/database");

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    amount: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: 'payment' // refund, void
    },
    reference: { type: String },

    currency: {
        type: String,
        default: 'NG'
    },
    status: String,

    paymentMethod: String,

    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }

});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    Transaction
}
