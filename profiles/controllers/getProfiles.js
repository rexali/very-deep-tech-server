const { Profile } = require("../models/profile.model");

/** 
 * Get an all clients
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProfiles = async (req, res) => {
    try {

        const page = parseInt(req.query?.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;

        const profiles = await Profile.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', ["_id", "email", "role"])
            .exec();

        const totalProfiles = (await Profile.find()).length;
        const newProfiles = JSON.parse(JSON.stringify(profiles)).map(profile => ({
            ...profile,
            totalProfiles
        })).reverse();

        if (profiles != null) {
            if (profiles.length) {
                res.status(200).json({
                    status: "success",
                    data: { profiles: newProfiles },
                    message: "profiles found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { profiles: [] },
                    message: "No profiles found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { profiles: null },
                message: "No profiles found",
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
    getProfiles
}