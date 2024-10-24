const { Message } = require("../models/message.model");
/** 
 * Delete message
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const deleteMessage = async (req, res) => {
    try {
        // get a notice id
        const _id = req.body._id;
        // delete message
        const message = await Message.deleteOne({ _id });
        // send success data
        if (message.deletedCount) {
            res.status(200).json({
                status: "success",
                data: { message },
                message: "Message deleted",
            });
        } else {
            res.status(200).json({
                status: "success",
                data: { message },
                message: "Message deletion failed",
            });
        }

    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message
        })
    }
}

module.exports = {
    deleteMessage
}