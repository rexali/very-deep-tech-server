var { mongoose } = require("../../config/database");

const notificationSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { 
    Notification, 
}
