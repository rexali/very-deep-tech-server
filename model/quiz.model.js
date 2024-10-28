var { mongoose } = require("../config/database");

const optionSchema = new mongoose.Schema({
    A: String,
    B: String,
    C: String,
    D: String
});
const quizSchema = new mongoose.Schema({
    text: String,
    type: String, // multiple choice, true/false, short answer
    options: optionSchema, // for multiple choice question
    answer: String,
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { 
    Quiz, 
    // optionSchema,
    // quizSchema 
}
