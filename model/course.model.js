var { mongoose } = require("../config/database");

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructor: String, // creator or user
    duration: Number,
    level: String,
    photo: String,
    price: Number,
    category: String,
    skills: [{ type: String }],
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = {
    Course,
    // courseSchema 
}
