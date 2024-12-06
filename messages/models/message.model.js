var { mongoose } = require("../../config/database");

const messageSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    title: String,
    comment: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    sender: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message
}
