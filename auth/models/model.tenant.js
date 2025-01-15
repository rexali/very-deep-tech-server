
var { mongoose } = require("../../config/database");

const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subdomain: { type: String, required: true, unique: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = {
    Tenant
}
