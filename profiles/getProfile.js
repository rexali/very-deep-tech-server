const { Profile } = require("../model/profile.model");

/** 
 * Get an all clients
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProfile = async (req, res) => {
    try {
        const _id = req.params.id
        const profile = await Profile.findOne().where({_id}).populate('user',["_id","email","role"]).exec();
        // send success data
        res.status(200).json({
            status: "success",
            data: { profile },
            message: "Profile read",
        });

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
    getProfile
}