var {mongoose} = require("../config/database");

const federationSchema = new mongoose.Schema({
    provider:String,
    subject:String,
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Federation = mongoose.model('Federation',federationSchema);

module.exports={
    Federation, 
    // federationSchema
}
