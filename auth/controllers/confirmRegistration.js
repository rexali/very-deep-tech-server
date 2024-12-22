const { escapeHTML } = require("../utils/escapeHTML");
const { isUserEmail } = require("./isUserEmail");
const { Mutex } = require("async-mutex");

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

        const newEmail = escapeHTML(email);
        const newCode = escapeHTML(rcode);

        let result = await isUserEmail(newEmail, newCode);

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