const { Profile } = require("../model/profile.model");
/**
 * Delete a client profile
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateProfile = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            _id,
            firstName,
            lastName,
            photo
        } = req.body;

        const profile = await Profile.updateOne(
            { _id},
            {
                firstName,
                lastName,
                photo
            });

        // send data as json
        res.status(200).json({
            status: "success",
            data: { profile },
            message: "Profile updated"
        })


    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(200).json({
            status: "failed",
            data: result,
            message: "Update failed"

        })
    }

};

module.exports = {
    updateProfile
}