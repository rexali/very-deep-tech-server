var { mongoose } = require("../../config/database");

const federationSchema = new mongoose.Schema({
    provider: String,
    subject: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

const Federation = mongoose.model('Federation', federationSchema);

module.exports = {
    Federation,
    // federationSchema
}
