var { mongoose } = require("../config/database");

const gradingSchema = new mongoose.Schema({
    score: Number,
    passingScore: String,
    attempts: Number,
    completed: Boolean,
    dateCompleted: Date,
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Grading = mongoose.model('Grading', gradingSchema);

module.exports = { 
    Grading, 
    // gradingSchema 
}
