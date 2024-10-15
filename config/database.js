var mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// For Local MongoDb Connection
// mongoose.connect("mongodb://localhost:27017/edudb", {}).then(() => {
//     console.log("Connected to Mongodb succesffully");
// }).catch(err => {
//     console.warn(err);
// });

// For Cloud MongoDb Connection
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xdhuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("Connected to Mongodb succesffully");
}).catch(error => {
    console.log(error.message)
});

module.exports = { mongoose };