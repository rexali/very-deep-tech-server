var { mongoose } = require("../../config/database");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    rcode: String,
    subdomain:String,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});


const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
