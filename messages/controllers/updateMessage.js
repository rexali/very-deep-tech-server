const {Message } = require("../models/message.model");
/**
 * Update message
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateMessage = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            _id,
            title,
            body
        } = req.body;

        const message = await Message.updateOne({ _id },
            {
                title,
                body,
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
            res.status(200).json({
                status: "success",
                data: { message },
                message: "Message update failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: result,
            message: "Error! "+error.message

        })
    }

};

module.exports = {
    updateMessage
}