var { mongoose } = require("../config/database");

const enrollmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    enrolledAt: Date,
    Completed: Boolean,
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = { 
    Enrollment, 
    // enrollmentSchema 
}
