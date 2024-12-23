const { sendMail } = require("../../utils/sendMail");
const { changeHTMLMSQ } = require("../../utils/changeHTMLMSQ");
const { isUserCodeUpdated } = require("./isUserCodeUpdated");
const { User } = require("../models/user.model");
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { escape } = require('html-escaper');


/**
 * Request for password change
 * @param {object} req - user request
 * @param {object} res - response to user request
 */

const mutex = Promise.resolve();
const requestPassword = (req, res) => {
    mutex.then(async () => {

        const {
            email
        } = req.body;


        // let us validate inputs
        const schema = Joi.object({
            email: Joi.string().email().required()
        });
        const { error, value } = schema.validate({ email });

        if (error) {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Error! " + error.message
            })
        } else {

            // make safe email and password by escaping html elements
            let emailx = escape(email);


            try {
                // generate random code
                const rcode = uuidv4();
                // check the email exist
                let result = await User.findOne({ email: emailx });
                // if exist prepare the sql to upadte the rcode
                if (result != null && result.email == emailx) {
                    // update the user rcode
                    let codeResult = await isUserCodeUpdated(emailx, rcode);
                    if (codeResult) {
                        const html = changeHTMLMSQ(emailx, rcode)
                        let mailResult = await sendMail(emailx, 'Requested password change', 'html', html, '')
                        if (mailResult) {
                            res.status(200).json({
                                status: "success",
                                message: "Password request successful",
                                data: { result: mailResult }
                            });
                        } else {
                            res.status(404).json({
                                status: "failed",
                                message: "Password change failed",
                                data: { result: false }
                            });
                        }
                    } else {
                        console.warn('random code update error');
                        res.status(404).json({
                            status: "failed",
                            message: "Random code generation error",
                            data: { result: false }
                        });
                    }
                } else {
                    console.warn('no email')
                    res.status(404).json({
                        status: "failed",
                        message: "Email does not exist",
                        data: { result: false }
                    });
                }

            } catch (error) {
                console.warn(error);
                res.status(404).json({
                    status: "failed",
                    message: "Internal server error",
                    data: { result: false }
                });
            }
        }
    }).catch((error) => {
        console.warn(error);
    });

    return mutex;
}

module.exports = {
    requestPassword
}
