const { getUserPassword } = require("./getUserPassword");
const { getUserToken } = require("./getUserToken");
const { checkpass } = require("../../utils/hashHelper");
const { Mutex } = require("async-mutex");
const Joi = require('joi');
const { escape } = require('html-escaper');

// create mutex instance
const mutex = new Mutex();
/**
 * Login user
 * @param {object} req - user request 
 * @param {object} res - response to user request
 * @returns void
 */
const loginUserHandler = async (req, res) => {
    // acquire access to the path to do operation (to prevent race condition)
    const release = await mutex.acquire();

    try {
        // get email and password
        const { email, password } = req.body;
        // let us validate inputs
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { error, value } = schema.validate({ email, password });

        if (error) {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Error! " + error.message
            })
        } else {

            // make safe email and password by escaping html elements
            let passwordx = escape(password);
            let emailx = escape(email);
            //  check if both email and password provided
            if (passwordx && emailx) {

                const clientData = {
                    email: emailx,
                    password: passwordx
                }
                // get password - user password in database
                let dbpassword = await getUserPassword(clientData.email);    //await User.findOne({ email: clientData.email });
                // check to see it is not empty or undefined
                if (!dbpassword) {
                    //    if null, send response
                    res.status(404).json({
                        status: "fail",
                        message: "email doesn't match any registered user",
                        data: null
                    });
                } else {
                    // verify the database password with password provided by user
                    if (checkpass(dbpassword, clientData.password)) {
                        // get logged-in token
                        const token = await getUserToken(clientData.email);
                        //  store in cookie
                        res.cookie('token', token, { httpOnly: true, secure: false });
                        // send token and other detail
                        res.status(200).json({
                            status: "success",
                            message: "Logged in successfully",
                            data: { token }
                        });

                    } else {
                        res.status(404).json({
                            status: "failed",
                            message: "password mismatch",
                            data: null
                        });
                    }
                }

            } else {
                res.status(404).json({
                    status: "failed",
                    message: "email or password missing",
                    data: null
                });
            }
        }

    } catch (error) {
        // catch error
        console.warn(error);
        res.status(500).json({
            status: "failed",
            message: "Error! " + error.message,
            data: null
        });
    } finally {
        // release path for other
        release();
    }

}

module.exports = {
    loginUserHandler
}