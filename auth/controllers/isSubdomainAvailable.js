const { User } = require("../models/user.model");

async function isSubdomainAvailbale(req, res) {
    try {
        const subdomain = req.query?.subdomain ?? "";
        const user = await User.find({ subdomain });

        if (user !== null && Object.keys(user).length >= 1) {
            res.status(200).json({
                status: "success",
                data: { result: true, subdomain: user.subdomain },
                message: "Subdomain exists"
            })
        } else {
            res.status(200).json({
                status: "failed",
                data: { result: false },
                message: "Subdomain doesn't exist"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message
        })
    }

}

module.exports = { isSubdomainAvailbale }