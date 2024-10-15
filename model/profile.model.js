var { mongoose } = require("../config/database");

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    photo: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { 
    Profile, 
    // profileSchema 
}
