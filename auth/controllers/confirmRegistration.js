const { isUserEmail } = require("./isUserEmail");
const { Mutex } = require("async-mutex");
const Joi = require('joi');
const { escape } = require('html-escaper');

// create mutex instance
const mutex = new Mutex();
/**
 * Confirm chage of password or registration success
 * @param {object} req - user request
 * @param {object} res - response to user request
 */
const confirmRegistration = async (req, res) => {
    // acquire access to the path to do operation (for race condition)
    const release = await mutex.acquire();
    try {
        const {
            email,
            rcode,
        } = req.body;

        // let us validate inputs
        const schema = Joi.object({
            email: Joi.string().email().required(),
            rcode: Joi.string().required()
        });
        const { error, value } = schema.validate({ email, rcode });

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
            let rcodex = escape(rcode);

        let result = await isUserEmail(emailx, rcodex);

        if (result) {
            res.status(200).json({
                status: "success",
                message: "Confirmed successfully",
                data: { result: true }
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "Confirmation failed",
                data: { result: false }
            });
        }
    }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            data: null
        });
    } finally {
        // release path for other
        release();
    }


}

module.exports = {
    confirmRegistration
}