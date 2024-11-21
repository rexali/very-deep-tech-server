const { Profile } = require("../models/profile.model");

/** 
 * Get an all clients
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find()
            .populate('user', ["_id", "email", "role"])
            .exec();


            if (profiles != null) {
                if (profiles.length) {
                    res.status(200).json({
                        status: "success",
                        data: { profiles },
                        message: "profile found",
                    });
                } else {
                    res.status(404).json({
                        status: "failed",
                        data: { profiles: [] },
                        message: "No profile found",
                    });
                }
            } else {
                res.status(400).json({
                    status: "failed",
                    data: { profiles: null },
                    message: "No transaction found",
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
    getProfiles
}