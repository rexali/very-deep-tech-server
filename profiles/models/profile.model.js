var { mongoose } = require("../../config/database");

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    photo: String,
    streetAddress: String,
    localGovt: String,
    state: String,
    country: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

const Profile = mongoose.model('Profile', profileSchema); 

module.exports = {
    Profile
}
