const { Profile } = require("../models/profile.model");
/**
 * Delete a client profile
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createProfile = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            user,
            firstName,
            lastName,
            streetAddress,
            localGovt,
            state,
            photo
        } = req.body;

        let subdomain= req.body?.subdomain??"";


        const profile = await Profile.create(
            {
                user,
                firstName,
                lastName,
                streetAddress,
                localGovt,
                state,
                photo,
                subdomain
            });

        // send data as json
        res.status(200).json({
            status: "success",
            data: { profile },
            message: "Profile created"
        })


    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(200).json({
            status: "failed",
            data: result,
            message: "profile failed"

        })
    }

};

module.exports = {
    createProfile
}