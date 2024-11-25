const multer =require("multer");
const { uploadFile } = require("../../utils/uploadFile");
const { Profile } = require("../models/profile.model");

/**
 * Delete a client profile
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateProfile = async (req, res) => {

    try {

        uploadFile('photo')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                throw new Error(err.message)
            } else if (err) {
                // An unknown error occurred when uploading.
                throw new Error(err)
            };
            // Everything went fine, send the file name and other fields to database
            const {
                user,
                firstName,
                lastName,
                streetAddress,
                localGovt,
                state,
                photo
            } = req.body;

            if (req.file?.filename) {
                // save in database
            const profile = await Profile.updateOne({ user }, {
                firstName,
                lastName,
                streetAddress,
                localGovt,
                state,
                photo: req.file?.filename
            });
            // send data as json
            res.status(200).json({
                status: "success",
                data: { profile },
                message: "Profile updated"
            })
            } else {
                
            }
            
        });

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message

        })
    }

};

module.exports = {
    updateProfile
}