var mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect("mongodb://localhost:27017/edudb", {}).then(() => {
    console.log("Connected to Mongodb succesffully");
}).catch(err => {
    console.warn(err);
});

module.exports = { mongoose };