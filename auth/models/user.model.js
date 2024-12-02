var { mongoose } = require("../../config/database");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    rcode: String,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" }
});


const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    // userSchema
}
