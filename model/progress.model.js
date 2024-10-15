var { mongoose } = require("../config/database");

const progressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    progress: Number, // percentage
    currentModule: Number,
    completedModules: [{ type: String }]
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = { 
    Progress, 
    // progressSchema 
}
