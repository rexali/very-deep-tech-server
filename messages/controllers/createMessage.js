const { Message } = require("../models/message.model");
/**
 * Create a message
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createMessage = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            title,
            comment,
            sender,
            _id // user Id
        } = req.body;

        const message = await Message.create(
            {
                title,
                comment,
                sender,
                createdAt: new Date(),
                updatedAt: new Date(),
                user: _id 
            });

        if (message != null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { message },
                message: "Message created"
            })
        } else {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { message },
                message: "Message creation failed"
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
    createMessage
}