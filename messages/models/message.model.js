var { mongoose } = require("../../config/database");

const messageSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    title: String,
    comment: String,
    subdomain:String,
    read: { type: String, default: 'no' },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    sender: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message
}
