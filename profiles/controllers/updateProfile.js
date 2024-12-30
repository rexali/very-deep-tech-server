const multer = require("multer");
const { uploadFile } = require("../../utils/uploadFile");
const { Profile } = require("../models/profile.model");
const Joi = require('joi');
const { escape } = require('html-escaper');

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
                state
            } = req.body;

            // let us validate inputs
            const schema = Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                streetAddress: Joi.string(),
                localGovt: Joi.string(),
                state: Joi.string()
            });

            const { error, value } = schema.validate({ firstName, lastName, streetAddress, localGovt, state });

            if (error) {
                // send data as json
                res.status(400).json({
                    status: "failed",
                    data: null,
                    message: "Error! " + error.message
                })
            } else {

                // let us sanitize our inputs

                let firstNamex = escape(firstName);
                let lastNamex = escape(lastName);
                let streetAddressx = escape(streetAddress);
                let localGovtx = escape(localGovt);
                let statex = escape(state);

                if (req.file?.filename) {
                    
                    const profile = await Profile.updateOne({ user }, {
                        firstName: firstNamex,
                        lastName: lastNamex,
                        streetAddress: streetAddressx,
                        localGovt: localGovtx,
                        state: statex,
                        photo: req.file?.filename
                    });
                    // send data as json
                    res.status(200).json({
                        status: "success",
                        data: { profile },
                        message: "Profile updated"
                    })

                } else {
                    // save in database
                    const profile = await Profile.updateOne({ user }, {
                        firstName: firstNamex,
                        lastName: lastNamex,
                        streetAddress: streetAddressx,
                        localGovt: localGovtx,
                        state: statex
                    });
                    // send data as json
                    res.status(200).json({
                        status: "success",
                        data: { profile },
                        message: "Profile updated"
                    })

                }

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