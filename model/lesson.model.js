var { mongoose } = require("../config/database");

const lessonSchema = new mongoose.Schema({
    name: String,
    description: String,
    content:String, // text, html etc
    video:String,
    duration:String,
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { 
    Lesson, 
    // lessonSchema 
}
