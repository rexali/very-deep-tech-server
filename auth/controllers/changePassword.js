const { transact } = require("../dbase/transact");
const { User } = require("../models/user.model");
const { escapeHTML } = require("../utils/escapeHTML");
const { hashpass } = require("../utils/hashHelper");
const { isUserEmail } = require("./isUserEmail");
const { Mutex } = require("async-mutex");

// create mutex instance
const mutex = new Mutex();
/**
 * Change password
 * @param {object} req - user request
 * @param {object} res - response to user request
 */
const changePassword = async (req, res) => {
    // acquire access to the path to do operation (for race condition)
    const release = await mutex.acquire();
    try {
        const {
            email,
            rcode,
            password
        } = req.body;

        const newEmail = escapeHTML(email);
        const newCode = escapeHTML(rcode);
        const newPassword = escapeHTML(password);

        let result = await isUserEmail(newEmail, newCode);

        if (result) {
            let result = await User.updateOne({ email: newEmail, rcode: rcode }, { password: hashpass(newPassword) })
            res.status(200).json({
                status: "success",
                message: "Password changed successfully",
                data: { result }
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "Password change failed",
                data: { result: false }
            });
        }
    } catch (error) {
        console.warn(error);

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
    changePassword
}