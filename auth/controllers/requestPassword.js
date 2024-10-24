const { sendMail } = require("../../utils/sendMail");
const { changeHTMLMSQ } = require("../../utils/changeHTMLMSQ");
const { escapeHTML } = require("../../utils/escapeHTML");
const { isUserCodeUpdated } = require("./isUserCodeUpdated");
const { isUserEmail } = require("./isUserEmail");

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
            const rCode = uuidv4();
            // check the email exist
            let result = await isUserEmail(newEmail, rCode)
            // if exist prepare the sql to upadte the rCode
            if (result) {
                // update the user rCode
                let codeResult = await isUserCodeUpdated(newEmail, rCode);
                if (codeResult) {
                    const html = changeHTMLMSQ(newEmail, rCode)
                    let mailResult = true; //await sendMail(email, 'Request password', 'html', html, '')
                    if (mailResult) {

                        res.json({ result: true });
                    } else {

                        res.json({ result: false });
                    }
                } else {
                    console.warn('random code update error');
                }
            } else {
                console.warn('no email')
            }
        } catch (error) {
            console.warn(error);
        }
    }).catch((error) => {
        console.warn(error);
    });

    return mutex;
}

module.exports = {
    requestPassword
}
