var { mongoose } = require("../../config/database");

const ratingSchema = new mongoose.Schema({
    ratingScore: {type:Number,default:0},
    review: String,
    approved: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = {
    Rating,
}
