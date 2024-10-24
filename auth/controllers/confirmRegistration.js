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
            rCode,
        } = req.body;
    
        const newEmail = escapeHTML(email);
        const newCode = escapeHTML(rCode);
    
        let result = await isUserEmail(newEmail, newCode);
    
        if (result) {
            res.json({ result: true })
        } else {
            res.json({ result: false })
        } 
    } catch (error) {
        
    } finally {
        // release path for other
        release();
    }
  

}

module.exports = {
    confirmRegistration
}