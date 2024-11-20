const { Profile } = require("../models/profile.model");

/** 
 * Get an all clients
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user',["_id","email","role"]).exec();
        
        if (profiles.length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { profiles},
                message: "Profile read",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "success",
                data: { profiles:[] },
                message: "Profile not found",
            });
        }

    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(200).json({
            status: "failed",
            data: null,
            message: "Error!"
        })
    }

}

module.exports = {
    getProfiles
}