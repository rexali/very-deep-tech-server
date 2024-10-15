const { Profile } = require("../models/profile.model");

/** 
 * Remove a client details
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const deleteProfile = async (req, res) => {
    try {
        // get a client id
        const _id = req.body._id;
        //    delete profile
        const profile = await Profile.deleteOne({ _id})
        // send success data
        res.status(200).json({
            status: "success",
            data: { profile },
            message: "profile deleted",
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
    deleteProfile
}