const { Tenant } = require("../models/model.tenant");

async function getTenant(req, res) {
    let subdomain = req.query.subdomain;
    try {
        const tenant = await Tenant.findOne({ subdomain: subdomain });
        if (tenant._id) {
            res.status(200).json({ 
                status: "success",
                message: "Tenant found",
                data: { tenant }
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "Tenant not found",
                data: { tenant: null }
            });
        }

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            data: null
        });
    }

}

module.exports = {  getTenant };                