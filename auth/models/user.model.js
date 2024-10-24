var {mongoose} = require("../../config/database");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:String,
    rcode:String
});


const User = mongoose.model('User',userSchema);

module.exports={
    User, 
    // userSchema
}
