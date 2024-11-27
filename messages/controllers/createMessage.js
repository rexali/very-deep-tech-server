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
        const title = req.body.title;
        const comment = req.body.comment;
        const user = req.body.userId;
        const sender = req.body.sender ?? ''; // email
        const firstName = req.body.firstName ?? '';
        const lastName = req.body.lastName ?? '';


        const message = await Message.create(
            {
                title,
                comment,
                user,
                sender,
                firstName,
                lastName,
                createdAt: new Date(),
                updatedAt: new Date(),
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
            res.status(400).json({
                status: "failed",
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