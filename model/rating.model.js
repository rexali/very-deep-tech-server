var { mongoose } = require("../config/database");

const ratingSchema = new mongoose.Schema({
    rating: Number,
    review: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = { 
    Rating, 
    // ratingSchema 
}
