var { mongoose } = require("../../config/database");

const messageSchema = new mongoose.Schema({
    title: String,
    comment: String,
    createdAt: Date,
    updatedAt: Date,
    sender: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message
}
