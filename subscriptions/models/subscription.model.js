var { mongoose } = require("../../config/database");

const subscriptionSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    createdAt: { type: Date, default: new Date() },
    updateAt: { type: Date },
    subdomain:String
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = {
    Subscription
}
