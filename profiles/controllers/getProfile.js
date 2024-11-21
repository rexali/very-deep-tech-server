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
        const profile = await Profile.findOne()
            .where({ user: userId })
            .populate('user', ["_id", "email", "role"])
            .exec();

            if (profile != null) {
                if (Object.keys(profile).length) {
                    res.status(200).json({
                        status: "success",
                        data: { profile },
                        message: "Profile found",
                    });
                } else {
                    res.status(404).json({
                        status: "failed",
                        data: { profile: {} },
                        message: "No profile found",
                    });
                }
            } else {
                res.status(400).json({
                    status: "failed",
                    data: { profile: null },
                    message: "No profile found",
                });
            }

    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(200).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message
        })
    }

}

module.exports = {
    getProfile
}