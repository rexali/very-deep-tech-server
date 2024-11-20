const { Profile } = require("../models/profile.model");

/** 
 * Get an all clients
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProfile = async (req, res) => {
    try {
        const userId = req.params.id
        const profile = await Profile.findOne().where({ user: userId }).populate('user', ["_id", "email", "role"]).exec();
        
        if (Object.keys(profile).length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { profile},
                message: "Profile read",
            });
        } else {
            // send success data
            res.status(404).json({
                status: "success",
                data: { profile:{} },
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
            message: "Error! "+error.message
        })
    }

}

module.exports = {
    getProfile
}