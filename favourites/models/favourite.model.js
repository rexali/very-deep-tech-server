var { mongoose } = require("../../config/database");

const favouriteSchema = new mongoose.Schema({
    subdomain:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = {
    Favourite
}
