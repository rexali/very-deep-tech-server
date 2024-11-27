const { Message } = require("../models/message.model");
/**
 * Update message
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateMessage = async (req, res) => {

    try {
        // retrieve the request body data
        const title = req.body.title;
        const comment = req.body.comment;
        const messageId = req.body.messageId;
        const sender = req.body.sender ?? ''; // email
        const firstName = req.body.firstName ?? '';
        const lastName = req.body.lastName ?? '';

        const message = await Message.updateOne({ _id: messageId },
            {
                title,
                comment,
                sender,
                firstName,
                lastName,
                updatedAt: new Date(),
            });
        if (message.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { message },
                message: "Message updated"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: { message },
                message: "Message update failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message

        })
    }

};

module.exports = {
    updateMessage
}