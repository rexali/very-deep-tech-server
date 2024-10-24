var { mongoose } = require("../../config/database");

const notificationSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdAt: Date,
    updatedAt: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { 
    Notification, 
}
