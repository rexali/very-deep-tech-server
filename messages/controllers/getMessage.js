const { Message } = require("../models/message.model");

/** 
 * Get one message
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getMessage = async (req, res) => {
    try {
        const _id = req.params.id
        const message = await Message.findById(_id).populate('user', ["_id", "email", "role"]).exec();
        // send success data
        if (Object.keys(message).length) {
            res.status(200).json({
                status: "success",
                data: { message },
                message: "Profile read",
            });
        } else {
            res.status(404).json({
                status: "success",
                data: { message },
                message: "No message found",
            });
        }


    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! "+error.message
        })
    }

}

module.exports = {
    getMessage
}