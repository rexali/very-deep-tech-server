var { mongoose } = require("../../config/database");

const favouriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = {
    Favourite
}
