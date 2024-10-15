const { hashpass } = require("../utils/hashHelper");
const { escapeHTML } = require("../utils/escapeHTML");
const { Mutex } = require("async-mutex");
const { User } = require("../model/user.model");
const { Profile } = require("../model/profile.model");

// create mutex instance
const mutex = new Mutex();

/**
 * Register new user
 * @param {object} req - user request object
 * @param {object} res - response to user request
 * @returns void
 */
const registerUserHandler = async (req, res) => {
    // acquire access to path, lock it to prevent race condition
    const release = await mutex.acquire();
    // get the reaquest body data
    const {
        password,
        email,
    } = req.body;

    // declare clientData
    let clientData;
    // get user role
    let role = req.body.role ?? "user";

    try {
        // initilise client data and escape each client details to protect XSS attack
        clientData = {
            email: escapeHTML(email),
            password: escapeHTML(password),
            role: escapeHTML(role)
        }
    } catch (error) {
        //   catch escapeHTML error
        res.status(400).json({
            status: "failed",
            message: "Error: " + error.message,
            data: null
        });
    }

    try {
        // hash the user password
        const hassPassword = hashpass(clientData.password);
        try {
            // enter data to users table
            const user = await new User({ email, password: hassPassword, role }).save();
            // check if insert Id is defined
            if (user._id) {
                // create user profile
                await Profile.create({ user: { _id: user._id } });
                // send result in json data
                res.status(200).json({
                    status: "success",
                    message: "registration successful",
                    data: {
                        _id: user._id,
                        email: user.email,
                        role: user.role
                    }
                });
            }
            // catch error
        } catch (error) {
            // log error
            console.warn(error);
            res.status(400).json({
                status: "failed",
                message: "registration unsuccessful",
                data: null
            });
        }

        // catch error
    } catch (error) {
        // log error
        console.warn(error);
        res.status(500).json({
            status: "failed",
            message: "registration unsuccessful",
            data: null
        });
    } finally {
        // release path for other
        release();
    }


}

module.exports = {
    registerUserHandler
}