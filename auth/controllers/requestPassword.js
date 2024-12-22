const { sendMail } = require("../../utils/sendMail");
const { changeHTMLMSQ } = require("../../utils/changeHTMLMSQ");
const { escapeHTML } = require("../../utils/escapeHTML");
const { isUserCodeUpdated } = require("./isUserCodeUpdated");
const { isUserEmail } = require("./isUserEmail");
const { v4: uuidv4 } = require('uuid');

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

        try {
            // escape the email 
            const newEmail = escapeHTML(email);
            // genrate random code
            const rcode = uuidv4();
            // check the email exist
            let result = await isUserEmail(newEmail, rcode)
            // if exist prepare the sql to upadte the rcode
            if (result) {
                // update the user rcode
                let codeResult = await isUserCodeUpdated(newEmail, rcode);
                if (codeResult) {
                    const html = changeHTMLMSQ(newEmail, rcode)
                    let mailResult = await sendMail(newEmail, 'Request password', 'html', html, '')
                    if (mailResult) {
                        res.status(200).json({
                            status: "success",
                            message: "Password request successful",
                            data: { result:mailResult }
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
    }).catch((error) => {
        console.warn(error);
    });

    return mutex;
}

module.exports = {
    requestPassword
}
