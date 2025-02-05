var { mongoose } = require("../../config/database");

const qouteSchema = new mongoose.Schema({
    email: String,
    phone: String,
    message: String,
    subdomain:String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const Qoute = mongoose.model('Qoute', qouteSchema);

module.exports = {
    Qoute
}
